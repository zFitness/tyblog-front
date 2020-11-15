<template>
  <div class="footer-toolbar">
    <div class="toolbar">
      <el-button>预览</el-button>
      <el-button>附件库</el-button>
      <el-button
        type="primary"
        @click="handlePublish"
      >发布</el-button>
    </div>
  </div>
</template>


<script>
import { EventBus } from "./event-bus";
export default {
  name: "FooterToolBar",
  methods: {
    handlePublish() {
      EventBus.$emit("publish");
    },
  },
};
</script>

<style lang="scss" scoped>
.footer-toolbar {
  position: fixed;
  width: 100%;
  bottom: 0;
  right: 0;
  height: 56px;
  line-height: 56px;
  -webkit-box-shadow: 0 -1px 2px rgba(0, 0, 0, 0.03);
  box-shadow: 0 -1px 2px rgba(0, 0, 0, 0.03);
  background: #fff;
  border-top: 1px solid #e8e8e8;
  padding: 0 24px;
  z-index: 1000;
  .toolbar {
    float: right;
  }
}
</style>