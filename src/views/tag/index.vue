<template>
  <div class="app-container">
    <el-row gutter="40">
      <el-col
        :xs="{span: 24}"
        :sm="{span: 24}"
        :md="{span: 12}"
        :lg="{span: 12}"
        :xl="{span: 12}"
        style="padding-right:8px;margin-bottom:30px;"
      >
        <tag-list></tag-list>
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

export default {
  components: {
    TagList,
    TagAdd,
  },
};
</script>

<style lang="scss" scoped>
.app-container {
  // background-color: #f0f2f5;
  // height: 100%;
}
</style>``