<template>
  <div class="app-container">

    <el-tabs
      type="border-card"
      v-model="activeTab"
    >
      <el-tab-pane
        label="独立页面"
        name="first"
      >
        <independent />
      </el-tab-pane>
      <el-tab-pane
        label="自定义页面"
        name="second"
      >
        <custom />
      </el-tab-pane>

    </el-tabs>

  </div>
</template>

<script>
import independent from "./components/independent";
import custom from "./components/custom";

export default {
  components: {
    independent,
    custom,
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