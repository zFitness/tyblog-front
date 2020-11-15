<template>
  <div class="markdown-container">
    <mavon-editor
      v-model="article.articleContent"
      :ishljs="true"
    />

    <footer-tool-bar />

    <article-setting-drawer
      :article_="article"
      :content="article.articleContent"
    />
  </div>
</template>

<script>
import FooterToolBar from "./components/FooterToolBar";
import ArticleSettingDrawer from "./components/ArticleSettingDrawer";
import { fetchArticle } from "@/api/article";
import { EventBus } from "./components/event-bus";

export default {
  name: "ArticleAdd",
  components: {
    FooterToolBar,
    ArticleSettingDrawer,
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
      dialogFormVisible: false,
      article: {
        articleTitle: "",
        articleSlug: "",
        createTime: "",
        articleSummary: "",
        articleStatus: "",
        articleContent: "",
        sort: {
          sortId: null,
        },
        labels: [],
      },
    };
  },
  mounted() {},
  destroyed() {
    EventBus.$off("publish", {});
  },
  methods: {},
};
</script>

<style scoped>
.title {
  margin-bottom: 20px;
  max-width: 300px;
}
.v-note-wrapper {
  z-index: 1;
  height: 700px;
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
