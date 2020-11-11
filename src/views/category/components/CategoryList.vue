<template>
  <div class="table-wrapper">
    <el-card class="box-card">
      <div
        slot="header"
        class="clearfix"
      >
        <span>分类列表</span>
      </div>
      <el-table
        :data="tableData"
        border
        fit
        style="width:100%"
      >
        <el-table-column
          prop="sortName"
          label="名称"
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="sortAlias"
          label="别名"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="sortDescription"
          label="描述"
        >
        </el-table-column>
        <el-table-column
          prop="count"
          label="文章数"
          width="120"
        >
        </el-table-column>

        <el-table-column
          label="操作"
          width="100"
        >
          <template slot-scope="{row, $index}">
            <el-button
              type="text"
              size="small"
              @click="handleEdit(row)"
            >编辑</el-button>
            <el-divider direction="vertical"></el-divider>
            <el-dropdown
              trigger="click"
              @command="handleCommand"
            >
              <span class="el-dropdown-link">
                更多
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="{'tag': 'a', 'sortId': row.sortId, 'index': $index}">添加到菜单</el-dropdown-item>
                <el-dropdown-item :command="{'tag': 'b', 'sortId': row.sortId, 'index': $index}">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        :total="total"
        :page.sync="listQuery.current"
        :limit.sync="listQuery.size"
        @pagination="listSorts"
      />
    </el-card>

  </div>

</template>

<script>
import { fetchSorts, deleteSort } from "@/api/sort";
import Pagination from "@/components/Pagination";
import { EventBus } from "./event-bus";

export default {
  components: {
    Pagination,
  },
  mounted() {
    this.listSorts();
  },
  methods: {
    handleEdit(row) {
      EventBus.$emit("edit", row);
    },
    handleClick(row) {
      console.log(row);
    },
    listSorts() {
      fetchSorts().then((resp) => {
        this.tableData = resp.data;
      });
    },
    handleCommand(command) {
      console.log(command);
      switch (command["tag"]) {
        case "b":
          deleteSort(command["sortId"]).then((resp) => {
            if (resp.code == 200) {
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
</style>