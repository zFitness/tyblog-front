<template>
  <el-drawer
    title="文章设置"
    :visible.sync="drawer"
    :direction="direction"
    size="480px"
  >
    <!-- <el-divider></el-divider> -->
    <div class="drawer-content">
      <el-form
        :model="article"
        label-position="top"
        ref="ruleForm"
        :rules="rules"
      >
        <!-- 标题 -->
        <el-form-item
          label="文章标题"
          prop="articleTitle"
        >
          <el-input
            v-model="article.articleTitle"
            autocomplete="off"
          />
        </el-form-item>
        <!-- 别名 -->
        <el-form-item
          label="文章别名"
          prop="articleSlug"
        >
          <el-input
            v-model="article.articleSlug"
            autocomplete="off"
          >
            <el-tooltip
              slot="append"
              class="item"
              effect="dark"
              content="自动生成"
              placement="bottom-start"
            >
              <el-button
                icon="el-icon-search"
                @click="handleSetSlug"
              ></el-button>
            </el-tooltip>
          </el-input>
        </el-form-item>
        <!-- 状态 -->
        <el-form-item label="状态">
          <el-radio-group v-model="article.articleStatus">
            <el-radio :label="'publish'">发布</el-radio>
            <el-radio :label="'draft'">草稿</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 开启评论 -->
        <el-form-item label="开启评论">
          <el-radio-group v-model="article.commentStatus">
            <el-radio :label="true">开启</el-radio>
            <el-radio :label="false">关闭</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 发表日期 -->
        <el-form-item label="发表日期">
          <el-date-picker
            v-model="article.createTime"
            type="datetime"
            placeholder="选择日期时间"
            align="right"
            value-format="yyyy-MM-dd HH:mm:ss"
            :default-value="new Date()"
          />
        </el-form-item>
        <!-- 分类 -->
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
        <!-- 标签 -->
        <el-form-item label="标签">
          <tag-select v-model="selectedLabel"></tag-select>
        </el-form-item>
      </el-form>
    </div>
    <div style="padding:50px;"></div>
    <div class="bottom-control">
      <el-button
        type="primary"
        @click="handlerCreateArticle"
      >发布</el-button>
    </div>
  </el-drawer>
</template>

<script>
import { EventBus } from "./event-bus";
import { getSlug } from "@/utils/slug";
import TagSelect from "./TagSelect";
import { fetchSorts } from "@/api/sort";
import { createArticle, updateArticle } from "@/api/article";

export default {
  props: {
    article_: {
      type: Object,
    },
    content: {
      type: String,
    },
  },
  components: {
    TagSelect,
  },
  data() {
    return {
      selectedLabel: [],
      drawer: false,
      direction: "rtl",
      sorts: [],
      article: {
        articleId: null,
        articleTitle: "",
        articleSlug: "",
        createTime: "",
        articleSummary: "",
        articleStatus: "publish",
        articleContent: "",
        commentStatus: true,
        sort: {
          sortId: null,
        },
        labels: [],
      },
      rules: {
        articleTitle: [
          { required: true, message: "请输入标题", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "blur",
          },
        ],
        articleSlug: [
          { required: true, message: "请输入别名", trigger: "blur" },
          {
            min: 1,
            max: 60,
            message: "长度在 1 到 60 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    getSorts() {
      fetchSorts().then((resp) => {
        this.sorts = resp.data;
      });
    },
    handleSetSlug() {
      this.article.articleSlug = getSlug(this.article.articleTitle);
    },
    handlerCreateArticle() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          this.createOrUpdateArticle();
        } else {
          return false;
        }
      });
    },
    createOrUpdateArticle() {
      this.article.articleContent = this.content;
      this.selectedLabel.forEach((labelId) => {
        this.article.labels.push({
          labelId: labelId,
        });
      });

      if (this.article.articleId != null) {
        updateArticle(this.article).then((resp) => {
          if (resp.code == 200) {
            this.$notify({
              title: "提示",
              message: "更新成功",
            });
            this.drawer = false;
            setTimeout(() => {
              this.$store.dispatch("tagsView/delView", this.$route);
              // 返回上一步路由
              this.$router.go(-1);
            }, 150);
          } else {
            this.$notify({
              title: "提示",
              message: resp.message,
            });
          }
        });
      } else {
        createArticle(this.article).then((resp) => {
          if (resp.code == 200) {
            this.$notify({
              title: "提示",
              message: "发布成功",
            });
            this.drawer = false;
            setTimeout(() => {
              this.$store.dispatch("tagsView/delView", this.$route);
              // 返回上一步路由
              this.$router.go(-1);
            }, 150);
          } else {
            this.$notify({
              title: "提示",
              message: resp.message,
            });
          }
        });
      }
    },
  },
  mounted() {
    EventBus.$on("publish", (param) => {
      this.drawer = true;
    });
    this.getSorts();
    this.article.createTime = new Date().format("yyyy-MM-dd hh:mm:ss");
  },
  watch: {
    article_(val) {
      this.article.articleId = this.article_.articleId;
      this.article.articleSlug = this.article_.articleSlug;
      this.article.articleTitle = this.article_.articleTitle;
      this.article.commentStatus = this.article_.commentStatus;
      this.article.createTime = this.article_.createTime;
      this.article.articleStatus = this.article_.articleStatus;
      let sort = this.article_.sort;
      if (sort != null) {
        this.article.sort.sortId = sort.sortId;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.drawer-content {
  padding: 0 20px;
}

.bottom-control {
  position: absolute;
  bottom: 0;
  width: 100%;
  z-index: 2;
  border-top: 1px solid #e8e8e8;
  padding: 10px 16px;
  text-align: right;
  left: 0;
  background: #fff;
  border-radius: 0 0 4px 4px;
}
</style>