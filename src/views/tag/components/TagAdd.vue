<template>
  <div class="form-wrapper">
    <el-card class="box-card">
      <div
        slot="header"
        class="clearfix"
      >
        <span v-text="isAdd?'添加标签':'修改标签'"></span>
      </div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item
          label="名称"
          prop="labelName"
        >
          <el-input v-model="ruleForm.labelName"></el-input>
        </el-form-item>
        <el-form-item
          label="别名"
          prop="labelSlug"
        >
          <el-input v-model="ruleForm.labelSlug"></el-input>
        </el-form-item>
        <el-form-item
          label="描述"
          prop="labelDescription"
        >
          <el-input
            type="textarea"
            v-model="ruleForm.labelDescription"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            v-show="!isAdd"
            type="primary"
            @click="submitForm('ruleForm')"
          >更新</el-button>
          <el-button
            v-show="!isAdd"
            @click="resetForm('ruleForm')"
          >返回添加</el-button>
          <el-button
            v-show="!isAdd"
            @click="handleDelete"
          >删除</el-button>
          <el-button
            v-show="isAdd"
            type="primary"
            @click="submitForm('ruleForm')"
          >保存</el-button>
          <el-button
            v-show="isAdd"
            @click="resetForm('ruleForm')"
          >重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

  </div>
</template>

<script>
import { createLabel, updateLabel, deleteLabel } from "@/api/label";
import { EventBus } from "./event-bus";

export default {
  data() {
    return {
      isAdd: true,
      ruleForm: {
        labelName: "",
        labelSlug: "",
        labelDescription: "",
      },
      ruleFormCopy: {
        labelName: "",
        labelSlug: "",
        labelDescription: "",
      },
      rules: {
        labelName: [
          { required: true, message: "请输入标签名称", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "长度在 1 到 10 个字符",
            trigger: "blur",
          },
        ],
        labelSlug: [
          { required: true, message: "请输入别名", trigger: "blur" },
          {
            min: 1,
            max: 40,
            message: "长度在 1 到 40 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    handleDelete() {
      deleteLabel(this.ruleForm.labelId).then((resp) => {
        if (resp.code == 200) {
          this.$notify({
            title: "成功",
            message: "删除成功",
            type: "success",
          });
          this.resetForm("ruleForm");
          //让标签列表进行更新
          EventBus.$emit("add");
        } else {
          this.$notify.error({
            title: "错误",
            message: resp.data,
          });
        }
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.isAdd) {
            createLabel(this.ruleForm).then((resp) => {
              if (resp.code == 200) {
                this.$notify({
                  title: "成功",
                  message: "添加成功",
                  type: "success",
                });
                this.resetForm("ruleForm");
                //让标签列表进行更新
                EventBus.$emit("add");
              } else {
                this.$notify.error({
                  title: "错误",
                  message: resp.message,
                });
              }
            });
          } else {
            updateLabel(this.ruleForm.labelId, this.ruleForm).then((resp) => {
              if (resp.code == 200) {
                this.$notify({
                  title: "成功",
                  message: "修改成功",
                  type: "success",
                });
                this.resetForm("ruleForm");
              } else {
                this.$notify.error({
                  title: "错误",
                  message: resp.message,
                });
              }
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      if (!this.isAdd) {
        //点击返回添加时
        this.isAdd = true;
        this.ruleForm = this.ruleFormCopy;
      } else {
        this.$refs[formName].resetFields();
      }
    },
  },
  mounted() {
    EventBus.$on("edit", (param) => {
      this.isAdd = false;
      this.ruleForm = param;
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