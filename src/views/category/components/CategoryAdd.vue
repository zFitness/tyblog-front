<template>
  <div class="form-wrapper">
    <el-card class="box-card">
      <div
        slot="header"
        class="clearfix"
      >
        <span v-text="isAdd?'添加分类':'修改分类'"></span>
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
          prop="sortName"
        >
          <el-input v-model="ruleForm.sortName"></el-input>
        </el-form-item>
        <el-form-item
          label="别名"
          prop="sortAlias"
        >
          <el-input v-model="ruleForm.sortAlias"></el-input>
        </el-form-item>
        <el-form-item
          label="上级目录"
          prop="parentSortId"
        >
          <el-select
            v-model="ruleForm.parentSortId"
            placeholder="请选择父目录"
          >
            <el-option
              v-for="(item,key) in sorts"
              :key="key"
              :label="item.sortName"
              :value="item.sortId"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="描述"
          prop="sortDescription"
        >
          <el-input
            type="textarea"
            v-model="ruleForm.sortDescription"
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
import { addSort, fetchSorts, updateSort } from "@/api/sort";
import { EventBus } from "./event-bus";

export default {
  data() {
    return {
      isAdd: true,
      sorts: [],
      ruleForm: {
        parentSortId: 0,
        sortAlias: "",
        sortDescription: "",
        sortName: "",
      },
      ruleFormCopy: {
        parentSortId: 0,
        sortAlias: "",
        sortDescription: "",
        sortName: "",
      },
      rules: {
        sortName: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 1, max: 10, message: "长度在 1 到 5 个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.isAdd) {
            addSort(this.ruleForm).then((resp) => {
              if (resp.code == 200) {
                this.$notify({
                  title: "成功",
                  message: "添加成功",
                  type: "success",
                });
                this.resetForm("ruleForm");
                //让分类列表进行更新
                EventBus.$emit("add");
              } else {
                this.$notify.error({
                  title: "错误",
                  message: "添加失败",
                });
              }
            });
          } else {
            updateSort(this.ruleForm).then((resp) => {
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
                  message: "修改失败",
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
    getSorts() {
      fetchSorts().then((resp) => {
        this.sorts = resp.data;
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
    this.getSorts();
    EventBus.$on("edit", (param) => {
      console.log(param);
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