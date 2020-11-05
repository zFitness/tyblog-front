<template>
  <el-tooltip
    content="添加文章"
    effect="dark"
    placement="bottom"
  >
    <div
      class="card-panel-icon-wrapper"
      @click="addArticle"
    >
      <svg-icon
        icon-class="add"
        class-name="card-panel-icon"
      />
    </div>
  </el-tooltip>
</template>

<script>
export default {
  methods: {
    addArticle() {
      this.$router.push("/article/add");
    },
  },
};
</script>


<style lang="scss" scoped>
</style>