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
          prop="date"
          label="名称"
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="别名"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="province"
          label="描述"
        >
        </el-table-column>
        <el-table-column
          prop="city"
          label="文章数"
          width="120"
        >
        </el-table-column>

        <el-table-column
          label="操作"
          width="100"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
            >编辑</el-button>
            <el-divider direction="vertical"></el-divider>
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                更多
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>添加到菜单</el-dropdown-item>
                <el-dropdown-item>删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

  </div>

</template>

<script>
export default {
  methods: {
    handleClick(row) {
      console.log(row);
    },
  },

  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1517 弄",
          zip: 200333,
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1519 弄",
          zip: 200333,
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
        },
      ],
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