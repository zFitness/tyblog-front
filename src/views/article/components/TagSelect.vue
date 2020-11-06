<template>
  <el-select
    style="width:100%"
    v-model="selectedLabels"
    size="medium"
    multiple
    filterable
    clearable
    allow-create
    default-first-option
    placeholder="请选择文章标签"
    @change="handleChange"
  >
    <el-option
      v-for="(item, key) in labels"
      :key="key"
      :label="item.labelName"
      :value="item.labelName"
    >
    </el-option>
  </el-select>
</template>

<script>
// 标签组件
import { fetchLabels, createLabel } from "@/api/label";

export default {
  props: {
    selectedLabelId: {
      type: Array,
    },
  },
  model: {
    prop: "selectedLabelId",
    event: "change",
  },
  data() {
    return {
      labels: [],
      selectedLabels: [],
    };
  },
  mounted() {
    this.getLabels();
  },
  computed: {
    labelNameMap() {
      const labelNameMap = {};
      this.labels.forEach((label) => {
        labelNameMap[label.labelName] = label;
      });
      return labelNameMap;
    },
    labelIdMap() {
      const labelIdMap = {};
      this.labels.forEach((label) => {
        labelIdMap[label.labelId] = label;
      });
      return labelIdMap;
    },
  },
  methods: {
    getLabels() {
      fetchLabels().then((resp) => {
        console.log(resp);
        this.labels = resp.data;

        //v-model进行双向绑定
        let list = [];
        this.selectedLabels.forEach((labelName) => {
          list.push(this.labelNameMap[labelName]["labelId"]);
        });
        this.$emit("change", list);
      });
    },
    handleChange() {
      //筛选出自定义的标签
      let labelNamesToCreate = this.selectedLabels.filter(
        (labelName) => !this.labelNameMap[labelName]
      );
      //添加标签到后台,如果没有添加标签，这里不会执行
      if (labelNamesToCreate.length != 0) {
        labelNamesToCreate.forEach((labelName) => {
          createLabel(labelName).then((resp) => {
            console.log(resp);
            //重新获得所有标签
            this.getLabels();
          });
        });
      } else {
        //v-model进行双向绑定
        let list = [];
        this.selectedLabels.forEach((labelName) => {
          list.push(this.labelNameMap[labelName]["labelId"]);
        });
        this.$emit("change", list);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>