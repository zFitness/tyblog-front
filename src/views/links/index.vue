<template>
  <div class="app-container">
    <el-row :gutter="40">
      <el-col
        :xs="{span: 24}"
        :sm="{span: 24}"
        :md="{span: 12}"
        :lg="{span: 12}"
        :xl="{span: 12}"
        style="padding-right:8px;margin-bottom:30px;"
      >
        <link-list :key="key" />
      </el-col>
      <el-col
        :xs="{span: 24}"
        :sm="{span: 24}"
        :md="{span: 12}"
        :lg="{span: 12}"
        :xl="{span: 12}"
        style="margin-bottom:30px;"
      >
        <link-add />
      </el-col>

    </el-row>
  </div>
</template>

<script>
import LinkList from "./components/LinkList";
import LinkAdd from "./components/LinkAdd";
import { EventBus } from "./components/event-bus";
export default {
  components: {
    LinkAdd,
    LinkList,
  },
  mounted() {
    EventBus.$on("add", () => {
      this.key++;
    });
  },
  destroyed() {
    EventBus.$off("edit", {});
    EventBus.$off("add", {});
  },
  data() {
    return {
      key: 1,
    };
  },
};
</script>

<style lang="scss" scoped>
.app-container {
  // background-color: #f0f2f5;
  // height: 100%;
}
</style>``