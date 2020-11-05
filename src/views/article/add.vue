<template>
  <div class="markdown-container">
    <mavon-editor
      v-model="article.articleContent"
      :ishljs="true"
      :toolbars="isMobile?toolbarsMov:undefined"
      :subfield="!isMobile"
    />
    <el-button
      type="primary"
      style="margin-top:10px"
      @click="dialogFormVisible=true"
    >发布</el-button>

    <!-- 编辑发布dialog -->
    <el-dialog
      title="文章设置"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="article">
        <el-form-item label="文章标题">
          <el-input
            v-model="article.articleTitle"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="article.articleStatus">
            <el-radio :label="'publish'">发布</el-radio>
            <el-radio :label="'draft'">草稿</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="发表日期">
          <el-date-picker
            v-model="article.articleDate"
            type="datetime"
            placeholder="选择日期时间"
            align="right"
            :picker-options="pickerOptions"
            value-format="yyyy-MM-dd HH:mm:ss"
            :default-value="new Date()"
          />
        </el-form-item>
        <el-form-item>
          <sort-select-tree></sort-select-tree>
        </el-form-item>
        <el-form-item label="标签">
          <tag-select v-model="selectedLabel"></tag-select>
        </el-form-item>
        <el-form-item label="摘要">
          <el-input
            v-model="article.articleSummary"
            type="textarea"
            :rows="4"
            placeholder="为空则自动生成"
          />
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="handlerCreateArticle"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { createArticle } from "@/api/article";
import { fetchSorts } from "@/api/sort";
import TagSelect from "./components/TagSelect";
import SortSelectTree from "./components/SortSelectTree";

export default {
  name: "ArticleModify",
  components: {
    TagSelect,
    SortSelectTree,
  },
  data() {
    return {
      selectedLabel: [],
      count: 1,
      newSort: [],
      pickerOptions: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
      dialogFormVisible: false,
      article: {
        articleTitle: "",
        articleDate: "",
        articleSummary: "",
        articleStatus: "draft",
        articleContent: "",
        sort: {
          sortId: null,
        },
        labels: [],
      },
      windowWidth: document.documentElement.clientWidth,
      isMobile: false,
      toolbarsMov: {
        link: true, // 链接
        imagelink: true, // 图片链接
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        preview: true, // 预览
      },
      sorts: [],
      labels: [],
    };
  },
  computed: {
    language() {},
  },
  watch: {
    windowWidth(val) {
      console.log(val);
      this.isMobile = this.windowWidth < 768;
    },
  },
  mounted() {
    this.getSorts();
    var that = this;
    window.onresize = () => {
      return (() => {
        window.fullWidth = document.documentElement.clientWidth;
        that.windowWidth = window.fullWidth;
      })();
    };
  },
  methods: {
    getSorts() {
      fetchSorts().then((resp) => {
        console.log(resp);
        this.sorts = resp.data;
      });
    },

    handlerCreateArticle() {
      if (this.article.articleTitle == "") {
        this.$notify({
          title: "提示",
          message: "标题不能为空",
        });
      } else if (this.article.articleContent == "") {
        this.$notify({
          title: "提示",
          message: "内容不能为空",
        });
      } else {
        this.selectedLabel.forEach((labelId) => {
          this.article.labels.push({
            labelId: labelId,
          });
        });
        createArticle(this.article).then((resp) => {
          console.log(resp);
          if (resp.code == 20000) {
            this.$notify({
              title: "提示",
              message: "发布成功",
            });
            // this.$router.push("/article/list")
            setTimeout(() => {
              this.$router.push("/article/list");
            }, 150);
          }
        });
      }
    },
    getArticle() {
      console.log(this.$route.params.id);
      fetchArticle(this.$route.params.id).then((resp) => {
        console.log(resp);
        this.article = resp.data;
      });
    },
  },
};
</script>

<style scoped>
.title {
  margin-bottom: 20px;
  max-width: 300px;
}
.v-note-wrapper {
  z-index: 1;
  height: 680px;
  overflow-y: scroll;
}
.markdown-container {
  margin: 10px 2vw;
}
.editor-container {
  margin-bottom: 30px;
}
.tag-title {
  margin-bottom: 5px;
}
</style>
