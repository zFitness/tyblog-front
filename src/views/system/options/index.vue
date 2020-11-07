<template>
  <div class="app-container">

    <el-tabs
      type="border-card"
      v-model="activeTab"
    >
      <el-tab-pane
        label="基础设置"
        name="first"
      >
        <base-options />
      </el-tab-pane>
      <el-tab-pane
        label="自定义页面"
        name="second"
      >
        2
      </el-tab-pane>

    </el-tabs>

  </div>
</template>

<script>
import BaseOptions from "./components/BaseOptions";
export default {
  components: {
    BaseOptions,
  },
  data() {
    return {
      activeTab: "first",
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
</style>