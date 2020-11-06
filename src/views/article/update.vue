<template>
  <div class="markdown-container">
    <mavon-editor
      v-model="article.articleContent"
      :ishljs="true"
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
            v-model="article.createTime"
            type="datetime"
            placeholder="选择日期时间"
            align="right"
            :picker-options="pickerOptions"
            value-format="yyyy-MM-dd HH:mm:ss"
            :default-value="new Date()"
          />
        </el-form-item>
        <el-form-item label="分类">
          <el-select
            v-model="article.sort.sortId"
            placeholder="请选择"
          >
            <el-option
              v-for="item in sorts"
              :key="item.sortId"
              :label="item.sortName"
              :value="item.sortId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标签">
          <tag-select v-model="selectedLabel"></tag-select>
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
import { fetchArticle, updateArticle } from "../../api/article";
import { fetchSorts } from "@/api/sort";
import TagSelect from "./components/TagSelect";

export default {
  name: "ArticleModify",
  components: {
    TagSelect,
  },
  data() {
    return {
      selectedLabel: [],
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
      sorts: [],
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
    };
  },
  computed: {
    language() {},
  },
  mounted() {
    var that = this;
    this.getSorts();
    this.getArticle();
  },
  methods: {
    getSorts() {
      fetchSorts().then((resp) => {
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
        this.article.labels = [];
        this.selectedLabel.forEach((labelId) => {
          this.article.labels.push({
            labelId: labelId,
          });
        });

        updateArticle(this.article).then((resp) => {
          if (resp.code == 20000) {
            this.$notify({
              title: "提示",
              message: "更新成功",
            });
            setTimeout(() => {
              this.$router.push("/article/list");
            }, 150);
          }
        });
      }
    },
    getArticle() {
      fetchArticle(this.$route.params.id).then((resp) => {
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
