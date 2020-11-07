<template>
  <div class="form-wrapper">
    <el-card class="box-card">
      <div
        slot="header"
        class="clearfix"
      >
        <span v-text="isAdd?'添加友链':'修改友链'"></span>
      </div>
      <el-form
        :model="linkForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item
          label="网站名称"
          prop="linkName"
        >
          <el-input v-model="linkForm.linkName"></el-input>
        </el-form-item>
        <el-form-item
          label="网站地址"
          prop="linkUrl"
        >
          <el-input v-model="linkForm.linkUrl"></el-input>
        </el-form-item>
        <el-form-item
          label="Logo"
          prop="linkImage"
        >
          <el-input v-model="linkForm.linkImage"></el-input>
        </el-form-item>

        <el-form-item
          label="描述"
          prop="linkDescription"
        >
          <el-input
            type="textarea"
            v-model="linkForm.linkDescription"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            v-if="!isAdd"
            type="primary"
            @click="submitForm('ruleForm')"
          >更新</el-button>
          <el-button
            v-if="!isAdd"
            @click="resetForm('ruleForm')"
          >返回添加</el-button>
          <el-button
            v-if="isAdd"
            type="primary"
            @click="submitForm('ruleForm')"
          >保存</el-button>
          <el-button
            v-if="isAdd"
            @click="resetForm('ruleForm')"
          >重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

  </div>
</template>

<script>
import { addLink, updateLink } from "@/api/links";
import { EventBus } from "./event-bus";
import editor from "mavon-editor";
import { Row } from "element-ui";

export default {
  data() {
    return {
      isAdd: true,
      updateForm: {},
      linkForm: {
        linkName: "",
        linkImage: "",
        linkDescription: "",
        linkUrl: "",
        linkImage: "",
        linkTarget: "_blank",
      },
      linkFormCopy: {
        linkName: "",
        linkImage: "",
        linkDescription: "",
        linkUrl: "",
        linkImage: "",
        linkTarget: "_blank",
      },
      rules: {
        linkName: [
          { required: true, message: "请输入链接名", trigger: "blur" },
        ],
        linkUrl: [
          { required: true, message: "请输入网址", trigger: "blur" },
          {
            validator: function (rule, value, callback) {
              if (
                /(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/.test(
                  value
                ) == false
              ) {
                callback(new Error("请输入正确的URL"));
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],
        linkImage: [
          { required: true, message: "请输入图片地址", trigger: "blur" },
          {
            validator: function (rule, value, callback) {
              if (
                /(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/.test(
                  value
                ) == false
              ) {
                callback(new Error("请输入正确的URL"));
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],
        linkDescription: [
          { required: true, message: "请输入描述", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.isAdd) {
            addLink(this.linkForm).then((resp) => {
              if (resp.code == 20000) {
                this.$notify({
                  title: "成功",
                  message: "添加成功",
                  type: "success",
                });
                this.resetForm("ruleForm");
                //让友情链接列表进行更新
                EventBus.$emit("add");
              } else {
                this.$notify.error({
                  title: "错误",
                  message: "添加失败",
                });
              }
            });
          } else {
            updateLink(this.linkForm).then((resp) => {
              if (resp.code == 20000) {
                this.$notify({
                  title: "成功",
                  message: "修改成功",
                  type: "success",
                });
                this.resetForm("ruleForm");
              } else {
                this.$notify.error({
                  title: "错误",
                  message: "修改失败",
                });
              }
            });
          }
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      if (!this.isAdd) {
        //点击返回添加时
        this.isAdd = true;
        this.linkForm = this.linkFormCopy;
      } else {
        this.$refs[formName].resetFields();
      }
    },
  },
  mounted() {
    EventBus.$on("edit", (param) => {
      console.log(param);
      this.isAdd = false;
      this.linkForm = param;
    });
    EventBus.$on("delete", () => {
      this.resetForm("ruleForm");
    });
  },
};
</script>

<style lang="scss" scoped>
.form-wrapper {
  background: #fff;
  // width: ;
}
</style>