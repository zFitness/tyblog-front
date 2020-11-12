<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
.el-drawer__header {
  margin-bottom: 0px;
}
.el-drawer__header span:focus,
.el-drawer__header button {
  outline: 0 !important;
}

/** 抽屉宽度 */
@media screen and (max-width: 768px) {
  .el-drawer {
    width: 100% !important;
  }
}

.el-divider--horizontal {
  margin: 16px 0;
}
.el-drawer__header {
  padding-top: 16px;
}
</style>
