<template>
  <div class="app-container">

    <el-tabs
      type="border-card"
      v-model="activeKey"
    >
      <el-tab-pane
        label="独立页面"
        name="independent"
      >
        <independent />
      </el-tab-pane>
      <el-tab-pane
        label="自定义页面"
        name="custom"
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
      activeKey: "independent",
    };
  },
  beforeRouteEnter(to, from, next) {
    // 设置打开哪个card
    const activeKey = to.query.activeKey;
    next((vm) => {
      if (activeKey) {
        vm.activeKey = activeKey;
      }
    });
  },
  watch: {
    activeKey: {
      handler: function (newVal, oldVal) {
        if (newVal) {
          const path = this.$router.history.current.path;
          this.$router.push({ path, query: { activeKey: newVal } });
        }
      },
    },
  },
  methods: {
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
</style>