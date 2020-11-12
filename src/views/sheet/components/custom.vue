<template>
  <div class="app-container">
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >

      <el-table-column
        label="标题"
        prop="sheetTitle"
      >
        <template slot-scope="{row}">
          <span
            :class="row.sheetStatus=='publish'?'link-type':''"
            @click="handleOpen(row)"
          >{{ row.sheetTitle }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="别名"
        prop="sheetSlug"
      >

      </el-table-column>
      <el-table-column
        label="评论数"
        width="110px"
        align="center"
        prop="sheetCommentCount"
      >
        <template slot-scope="{row}">
          <span>{{ row.sheetCommentCount }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="阅读量"
        align="center"
        width="95"
        prop="sheetViewCount"
      >
        <template slot-scope="{row}">
          <span
            v-if="row.sheetViewCount"
            class="link-type"
          >{{ row.sheetViewCount }}</span>
          <span v-else>0</span>
        </template>
      </el-table-column>
      <el-table-column
        label="状态"
        class-name="status-col"
        width="100"
        prop="sheetStatus"
      >
        <template slot-scope="{row}">
          <el-tag :type="row.sheetStatus | statusFilter">
            {{ row.sheetStatus }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="发布日期"
        width="250"
        align="center"
        prop="createTime"
      >

      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="230"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{row,$index}">
          <el-button
            type="text"
            size="small"
            @click="handleUpdate(row)"
          >
            编辑
          </el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button
            v-if="row.sheetStatus!='publish'"
            size="small"
            type="text"
            @click="handleModifyStatus(row,'publish')"
          >
            发布
          </el-button>
          <el-button
            v-if="row.sheetStatus!='draft'"
            size="small"
            type="text"
            @click="handleModifyStatus(row,'draft')"
          >
            禁用
          </el-button>
          <el-divider direction="vertical"></el-divider>
          <el-dropdown
            trigger="click"
            @command="handleCommand"
          >
            <span class="el-dropdown-link">
              更多
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="{'tag': 'a', 'sheetId': row.sheetId, 'index': $index}">删除</el-dropdown-item>
              <el-dropdown-item :command="{'tag': 'b', 'sheetId': row.sheetId, 'index': $index}">测试</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />

  </div>
</template>

<script>
import { listSheets, setSheetStatus, fetchPv, deleteSheet } from "@/api/sheet";

import waves from "@/directive/waves"; // waves directive
import { parseTime } from "@/utils";
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination

export default {
  name: "ComplexTable",
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "info",
        deleted: "danger",
      };
      return statusMap[status];
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type];
    },
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        title: undefined,
        status: undefined,
      },
      importanceOptions: [1, 2, 3],

      statusOptions: ["published", "draft", "deleted"],
      temp: {
        id: undefined,
        importance: 1,
        remark: "",
        timestamp: new Date(),
        title: "",
        type: "",
        status: "published",
      },
      dialogFormVisible: false,
      dialogStatus: "",
      textMap: {
        update: "Edit",
        create: "Create",
      },
      dialogPvVisible: false,
      pvData: [],
      downloadLoading: false,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    handleCommand(command) {
      console.log(command);
      switch (command["tag"]) {
        case "a":
          deleteSheet(command["sheetId"]).then((resp) => {
            if (resp.code == 200) {
              this.list.splice(command["index"], 1);
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
    getList() {
      this.listLoading = true;
      listSheets(this.listQuery).then((response) => {
        this.list = response.data.records;
        this.total = response.data.total;
        this.listLoading = false;
      });
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },
    handleModifyStatus(row, status) {
      setSheetStatus(row.sheetId, status).then((resp) => {
        this.$message({
          message: "操作Success",
          type: "success",
        });
        row.sheetStatus = status;
      });
    },
    sortChange(data) {
      const { prop, order } = data;
      if (prop === "id") {
        this.sortByID(order);
      }
    },
    sortByID(order) {
      if (order === "ascending") {
        this.listQuery.sort = "+id";
      } else {
        this.listQuery.sort = "-id";
      }
      this.handleFilter();
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: "",
        timestamp: new Date(),
        title: "",
        status: "published",
        type: "",
      };
    },
    handleCreate() {
      this.$router.push("/article/add");
    },
    createData() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024; // mock a id
          this.temp.author = "vue-element-admin";
          createArticle(this.temp).then(() => {
            this.list.unshift(this.temp);
            this.dialogFormVisible = false;
            this.$notify({
              title: "Success",
              message: "Created Successfully",
              type: "success",
              duration: 2000,
            });
          });
        }
      });
    },
    handleUpdate(row) {
      this.$router.push("/sheets/update/");
    },
    handleOpen(row) {
      //判断是否可以访问
      if (row.sheetStatus == "publish") {
        window.open("http://localhost:8080/sheet/" + row.sheetSlug, "_blank")
          .location;
      }
    },
    updateData() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp);
          tempData.timestamp = +new Date(tempData.timestamp); // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateArticle(tempData).then(() => {
            const index = this.list.findIndex((v) => v.id === this.temp.id);
            this.list.splice(index, 1, this.temp);
            this.dialogFormVisible = false;
            this.$notify({
              title: "Success",
              message: "Update Successfully",
              type: "success",
              duration: 2000,
            });
          });
        }
      });
    },
    handleDelete(row, index) {
      this.$confirm("此操作将永久删除此篇文章，是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteArticle(row.articleId).then((resp) => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.list.splice(index, 1);
            this.total--;
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已经取消删除",
          });
        });
    },
    handleFetchPv(pv) {
      fetchPv(pv).then((response) => {
        this.pvData = response.data.pvData;
        this.dialogPvVisible = true;
      });
    },
    handleDownload() {
      this.downloadLoading = true;
      import("@/vendor/Export2Excel").then((excel) => {
        const tHeader = ["timestamp", "title", "type", "importance", "status"];
        const filterVal = [
          "timestamp",
          "title",
          "type",
          "importance",
          "status",
        ];
        const data = this.formatJson(filterVal);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: "table-list",
        });
        this.downloadLoading = false;
      });
    },
    formatJson(filterVal) {
      return this.list.map((v) =>
        filterVal.map((j) => {
          if (j === "timestamp") {
            return parseTime(v[j]);
          } else {
            return v[j];
          }
        })
      );
    },
    getSortClass: function (key) {
      const sort = this.listQuery.sort;
      return sort === `+${key}` ? "ascending" : "descending";
    },
  },
};
</script>


<style lang="scss" scoped>
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
  font-size: 12px;
}
</style>