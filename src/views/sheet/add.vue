<template>
  <div
    class="markdown-container"
    v-if="loaded"
  >
    <mavon-editor
      v-model="sheet.sheetContent"
      :ishljs="true"
    />
    <el-button
      type="primary"
      style="margin-top:10px"
      @click="dialogFormVisible=true"
    >发布</el-button>

    <!-- 编辑发布dialog -->
    <el-dialog
      title="页面设置"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        :model="sheet"
        label-position="top"
      >
        <el-form-item label="页面标题">
          <el-input
            v-model="sheet.sheetTitle"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="页面别名">
          <el-input
            v-model="sheet.sheetSlug"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group
            v-model="sheet.sheetStatus"
            label="状态"
          >
            <el-radio :label="'publish'">发布</el-radio>
            <el-radio :label="'draft'">草稿</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否开启评论">
          <el-switch
            v-model="sheet.commentStatus"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </el-form-item>
        <el-form-item label="发表日期">
          <el-date-picker
            v-model="sheet.createTime"
            type="datetime"
            placeholder="选择日期时间"
            align="right"
            :picker-options="pickerOptions"
            value-format="yyyy-MM-dd HH:mm:ss"
            :default-value="new Date()"
          />
        </el-form-item>

      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="handlerCreateSheet"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { createSheet } from "@/api/sheet";
import { fetchSorts } from "@/api/sort";

export default {
  name: "SheetAdd",
  components: {},
  data() {
    return {
      loaded: false,
      selectedLabel: [],
      pickerOptions: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
      dialogFormVisible: false,
      sheet: {
        sheetTitle: "",
        sheetSlug: "",
        createTime: "",
        sheetSummary: "",
        sheetStatus: "draft",
        sheetContent: "",
        commentStatus: true,
      },
      sorts: [],
    };
  },
  mounted() {
    this.getSorts();
  },
  methods: {
    getSorts() {
      fetchSorts().then((resp) => {
        console.log(resp);
        this.sorts = resp.data;
        this.loaded = true;
      });
    },

    handlerCreateSheet() {
      if (this.sheet.sheetTitle == "") {
        this.$notify({
          title: "提示",
          message: "标题不能为空",
        });
      } else if (this.sheet.sheetContent == "") {
        this.$notify({
          title: "提示",
          message: "内容不能为空",
        });
      } else {
        this.selectedLabel.forEach((labelId) => {
          this.sheet.labels.push({
            labelId: labelId,
          });
        });
        createSheet(this.sheet).then((resp) => {
          console.log(resp);
          if (resp.code == 200) {
            this.$notify({
              title: "提示",
              message: "发布成功",
            });
            setTimeout(() => {
              this.$router.push("/sheets/list");
            }, 150);
          } else {
            this.$notify({
              title: "提示",
              message: resp.message,
            });
          }
        });
      }
    },
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
  height: 600px;
  overflow-y: scroll;
}
.markdown-container {
  margin: 10px 2vw;
}
.editor-container {
  margin-bottom: 30px;
}
.tag-title {
  margin-bottom: 5px;
}
</style>
