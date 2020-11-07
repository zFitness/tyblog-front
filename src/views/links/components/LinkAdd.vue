<template>
  <div class="form-wrapper">
    <el-card class="box-card">
      <div
        slot="header"
        class="clearfix"
      >
        <span>添加友链</span>
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
            type="primary"
            @click="submitForm('ruleForm')"
          >保存</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

  </div>
</template>

<script>
import { addLink } from "@/api/links";

export default {
  data() {
    return {
      linkForm: {
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
          addLink(this.linkForm).then((resp) => {
            if (resp.code == 20000) {
              this.$notify({
                title: "成功",
                message: "添加成功",
                type: "success",
              });
              this.resetForm("ruleForm");
            } else {
              this.$notify.error({
                title: "错误",
                message: "添加失败",
              });
            }
          });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
.form-wrapper {
  background: #fff;
  // width: ;
}
</style>