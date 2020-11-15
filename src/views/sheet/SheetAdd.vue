<template>
  <div class="markdown-container">

    <mavon-editor
      v-model="sheet.sheetContent"
      :ishljs="true"
    />

    <!-- footer-control -->
    <footer-tool-bar></footer-tool-bar>

    <!-- Drawer -->
    <sheet-setting-drawer
      :sheet="sheet"
      :content="sheet.sheetContent"
    ></sheet-setting-drawer>
  </div>
</template>

<script>
import { createSheet, fetchSheet } from "@/api/sheet";
import FooterToolBar from "./components/FooterToolBar";
import SheetSettingDrawer from "./components/SheetSettingDrawer";

export default {
  name: "SheetAdd",
  components: { FooterToolBar, SheetSettingDrawer },
  data() {
    return {
      sheet: {
        sheetContent: "",
      },
    };
  },
  beforeRouteEnter(to, from, next) {
    //得到页面id
    const sheetId = to.query.sheetId;
    next((vm) => {
      if (sheetId) {
        fetchSheet(sheetId).then((resp) => {
          vm.sheet = resp.data;
        });
      }
    });
  },
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
