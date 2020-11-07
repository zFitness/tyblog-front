<template>
  <div class="table-wrapper">
    <el-card class="box-card">
      <div
        slot="header"
        class="clearfix"
      >
        <span>所有标签</span>
      </div>

      <el-tooltip
        class="item"
        effect="dark"
        placement="top-start"
        v-for="(item, index) of tableData"
        :key="index"
        :content="item.articleCount + '篇文章'"
      >
        <el-tag
          size="medium"
          @click="handleClick(item)"
          class="tag"
        >{{item.labelName}}</el-tag>
      </el-tooltip>

    </el-card>

  </div>

</template>

<script>
import { fetchLabels } from "@/api/label";
import Pagination from "@/components/Pagination";
import { EventBus } from "./event-bus";

export default {
  components: {
    Pagination,
  },
  mounted() {
    this.listLabels();
  },
  methods: {
    handleClick(row) {
      EventBus.$emit("edit", row);
    },
    listLabels() {
      fetchLabels().then((resp) => {
        this.tableData = resp.data;
      });
    },
    handleCommand(command) {
      console.log(command);
      switch (command["tag"]) {
        case "b":
          deleteSort(command["sortId"]).then((resp) => {
            if (resp.code == 20000) {
              this.tableData.splice(command["index"], 1);
              this.total--;
              this.$notify({
                title: "成功",
                message: "删除成功",
                type: "success",
              });
              //如果在删除之前点击了更新按钮需要把更新组件清空
              EventBus.$emit("delete");
            }
          });
          break;
      }
    },
  },

  data() {
    return {
      tableData: [],
      total: 0,
      listQuery: {
        current: 1,
        size: 10,
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.table-wrapper {
  background: #fff;
  border-radius: 10px;
  // width: 620px;
}

.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
  font-size: 12px;
}

.tag {
  cursor: pointer;
  margin-bottom: 10px;
  margin-right: 10px;
}
</style>