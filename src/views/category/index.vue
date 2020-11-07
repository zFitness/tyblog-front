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
        <category-list :key="key"></category-list>
      </el-col>
      <el-col
        :xs="{span: 24}"
        :sm="{span: 24}"
        :md="{span: 12}"
        :lg="{span: 12}"
        :xl="{span: 12}"
        style="margin-bottom:30px;"
      >
        <category-add></category-add>
      </el-col>

    </el-row>
  </div>
</template>

<script>
import CategoryList from "./components/CategoryList";
import CategoryAdd from "./components/CategoryAdd";
import { EventBus } from "./components/event-bus";
export default {
  mounted() {
    EventBus.$on("add", () => {
      this.key++;
    });
  },
  destroyed() {
    EventBus.$off("add", {});
    EventBus.$off("edit", {});
  },
  components: {
    CategoryList,
    CategoryAdd,
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