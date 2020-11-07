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
        <tag-list :key="key"></tag-list>
      </el-col>
      <el-col
        :xs="{span: 24}"
        :sm="{span: 24}"
        :md="{span: 12}"
        :lg="{span: 12}"
        :xl="{span: 12}"
        style="margin-bottom:30px;"
      >
        <tag-add></tag-add>
      </el-col>

    </el-row>
  </div>
</template>

<script>
import TagList from "./components/TagList";
import TagAdd from "./components/TagAdd";
import { EventBus } from "./components/event-bus";
export default {
  data() {
    return {
      key: 1,
    };
  },
  components: {
    TagList,
    TagAdd,
  },
  mounted() {
    EventBus.$on("add", (param) => {
      this.key++;
    });
  },
};
</script>

<style lang="scss" scoped>
.app-container {
  // background-color: #f0f2f5;
  // height: 100%;
}
</style>``