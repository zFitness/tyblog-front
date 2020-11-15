<template>
  <div>
    <el-drawer
      title="页面设置"
      :visible.sync="drawer"
      :direction="direction"
      size="480px"
    >
      <el-divider></el-divider>
      <div class="drawer-content">
        <el-form
          :model="selectedSheet"
          :rules="rules"
          ref="ruleForm"
          label-position="top"
        >
          <el-form-item
            label="页面标题"
            prop="sheetTitle"
          >
            <el-input
              v-model="selectedSheet.sheetTitle"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item
            label="页面别名"
            prop="sheetSlug"
          >
            <el-input
              v-model="selectedSheet.sheetSlug"
              autocomplete="off"
            >
              <el-tooltip
                slot="append"
                class="item"
                effect="dark"
                content="自动生成"
                placement="bottom-start"
              >
                <el-button
                  icon="el-icon-search"
                  @click="handleSetSlug"
                ></el-button>
              </el-tooltip>

            </el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-radio-group
              v-model="selectedSheet.sheetStatus"
              label="状态"
            >
              <el-radio :label="'publish'">发布</el-radio>
              <el-radio :label="'draft'">草稿</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否开启评论">
            <el-switch
              v-model="selectedSheet.commentStatus"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
          </el-form-item>
          <el-form-item label="发表日期">
            <el-date-picker
              v-model="selectedSheet.createTime"
              type="datetime"
              placeholder="选择日期时间"
              align="right"
              value-format="yyyy-MM-dd HH:mm:ss"
              :default-value="new Date()"
            />
          </el-form-item>

        </el-form>
        <div
          slot="footer"
          class="bottom-control"
        >
          <el-button
            type="primary"
            @click="handlerCreateSheet"
          >发布</el-button>
        </div>
      </div>

    </el-drawer>
  </div>
</template>

<script>
import { EventBus } from "./event-bus";
import { getSlug } from "@/utils/slug";
import { createSheet, updateSheet } from "@/api/sheet";
export default {
  props: {
    sheet: {
      type: Object,
    },
    content: {
      type: String,
    },
  },
  data() {
    return {
      drawer: false,
      direction: "rtl",
      selectedSheet: {
        sheetId: null,
        sheetTitle: this.sheet.sheetTitle,
        sheetSlug: "",
        createTime: null,
        sheetStatus: "publish",
        commentStatus: true,
        sheetContent: "",
      },
      rules: {
        sheetTitle: [
          { required: true, message: "请输入标题", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "blur",
          },
        ],
        sheetSlug: [
          { required: true, message: "请输入别名", trigger: "blur" },
          {
            min: 1,
            max: 60,
            message: "长度在 1 到 60 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    handleSetSlug() {
      this.selectedSheet.sheetSlug = getSlug(this.selectedSheet.sheetTitle);
    },
    handlerCreateSheet() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          this.createOrUpdateSheet();
        } else {
          return false;
        }
      });
    },
    createOrUpdateSheet() {
      this.selectedSheet.sheetContent = this.content;
      if (this.selectedSheet.sheetId != null) {
        updateSheet(this.selectedSheet.sheetId, this.selectedSheet).then(
          (resp) => {
            if (resp.code == 200) {
              this.$notify({
                title: "提示",
                message: "更新成功",
              });
              this.drawer = false;
              setTimeout(() => {
                this.$router.push("/sheets/list?activeKey=custom");
                this.$store.dispatch("tagsView/delView", this.$route);
              }, 150);
            } else {
              this.$notify({
                title: "提示",
                message: resp.message,
              });
            }
          }
        );
      } else {
        createSheet(this.selectedSheet).then((resp) => {
          if (resp.code == 200) {
            this.$notify({
              title: "提示",
              message: "发布成功",
            });
            this.drawer = false;
            setTimeout(() => {
              this.$router.push("/sheets/list");
              this.$store.dispatch("tagsView/delView", this.$route);
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
  mounted() {
    EventBus.$on("publish", (param) => {
      this.drawer = true;
    });
    Date.prototype.format = function (fmt) {
      var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        S: this.getMilliseconds(), //毫秒
      };
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          (this.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
      }
      for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length == 1
              ? o[k]
              : ("00" + o[k]).substr(("" + o[k]).length)
          );
        }
      }
      return fmt;
    };
    this.selectedSheet.createTime = new Date().format("yyyy-MM-dd hh:mm:ss");
  },
  watch: {
    sheet(val) {
      this.selectedSheet.sheetId = this.sheet.sheetId;
      this.selectedSheet.sheetSlug = this.sheet.sheetSlug;
      this.selectedSheet.sheetTitle = this.sheet.sheetTitle;
      this.selectedSheet.sheetContent = this.sheet.sheetContent;
      this.selectedSheet.commentStatus = this.sheet.commentStatus;
    },
  },
};
</script>

<style lang="scss" scoped>
.drawer-content {
  padding: 0 20px;
}

.bottom-control {
  position: absolute;
  bottom: 0;
  width: 100%;
  border-top: 1px solid #e8e8e8;
  padding: 10px 16px;
  text-align: right;
  left: 0;
  background: #fff;
  border-radius: 0 0 4px 4px;
}
</style>