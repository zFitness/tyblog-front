<template>
  <div class="markdown-container">

    <mavon-editor
      v-model="sheetContent"
      :ishljs="true"
    />

    <!-- footer-control -->
    <footer-tool-bar></footer-tool-bar>

    <!-- Drawer -->
    <sheet-setting-drawer :sheetContent="sheetContent"></sheet-setting-drawer>
  </div>
</template>

<script>
import { createSheet } from "@/api/sheet";
import FooterToolBar from "./components/FooterToolBar";
import SheetSettingDrawer from "./components/SheetSettingDrawer";

export default {
  name: "SheetAdd",
  components: { FooterToolBar, SheetSettingDrawer },
  data() {
    return {
      sheetContent: "",
    };
  },
  mounted() {},
  methods: {},
};
</script>

<style scoped>
.title {
  margin-bottom: 20px;
  max-width: 300px;
}
.v-note-wrapper {
  z-index: 1;
  height: 900px;
  overflow-y: scroll;
}
.markdown-container {
  margin: 10px 20px 100px 20px;
}
.editor-container {
  margin-bottom: 30px;
}
.tag-title {
  margin-bottom: 5px;
}
</style>
