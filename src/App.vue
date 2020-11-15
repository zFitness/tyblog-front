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

.el-drawer__body {
  height: 100%;
  overflow-y: auto;
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
  padding: 16px 24px;
  border-bottom: 1px solid #e8e8e8;
}
</style>
