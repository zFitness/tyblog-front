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
          prop="linkName"
          label="名称"
        >
        </el-table-column>
        <el-table-column
          prop="linkUrl"
          label="网址"
        >
        </el-table-column>
        <el-table-column
          label="状态"
          align="center"
        >
          <template slot-scope="{row}">
            <el-switch
              v-model="row.visible"
              active-text=""
              inactive-text=""
              @change="handleSwitchChange(row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          prop="city"
          label="头像"
          width="120"
        >
          <template slot-scope="{row}">
            <el-image
              style="width: 100px; height: 100px"
              :src="row.linkImage"
              :fit="'fill'"
            ></el-image>
          </template>
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
                <el-dropdown-item :command="{'tag': 'a', 'linkId': row.linkId, 'index': $index}">删除</el-dropdown-item>
                <el-dropdown-item :command="{'tag': 'b', 'linkId': row.linkId, 'index': $index}">测试</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="listQuery.current"
        :limit.sync="listQuery.size"
        @pagination="getLinks"
      />
    </el-card>

  </div>

</template>

<script>
import { listLinks, setLinkVisible, deleteLink } from "@/api/links";
import Pagination from "@/components/Pagination";
import { EventBus } from "./event-bus";

export default {
  components: {
    Pagination,
  },
  methods: {
    handleEdit(row) {
      EventBus.$emit("edit", row);
    },
    handleSwitchChange(row) {
      console.log(row);
      setLinkVisible(row.linkId, row.visible).then((resp) => {
        if (resp.code == 20000) {
          this.$notify({
            title: "成功",
            message: "修改成功",
            type: "success",
          });
        }
      });
    },
    handleClick(row) {
      console.log(row);
    },
    getLinks() {
      listLinks(this.listQuery).then((resp) => {
        this.tableData = resp.data.records;
        this.total = resp.data.total;
      });
    },
    handleCommand(command) {
      console.log(command);
      switch (command["tag"]) {
        case "a":
          deleteLink(command["linkId"]).then((resp) => {
            console.log(resp);
            if (resp.code == 20000) {
              this.tableData.splice(command["index"], 1);
              this.total--;
              this.$notify({
                title: "成功",
                message: "删除成功",
                type: "success",
              });
            } else {
              this.$notify.error({
                title: "错误",
                message: "删除失败",
              });
            }
          });
          break;
      }
    },
  },
  mounted() {
    this.getLinks();
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
}

.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
  font-size: 12px;
}

.pagination {
  margin-top: 10px;
}
</style>