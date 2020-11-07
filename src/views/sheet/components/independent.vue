<template>
  <div>
    <el-table
      :data="pageData"
      style="width: 100%"
    >
      <el-table-column
        prop="name"
        label="页面名称"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="address"
        label="访问地址"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
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
            @click="edit"
          >管理</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button
            type="text"
            size="small"
          >访问</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
 <script>
export default {
  data() {
    return {
      pageData: [
        {
          status: "可用",
          name: "友情链接",
          address: "http://localhost:8090/links",
        },
        {
          status: "可用",
          name: "友情链接",
          address: "http://localhost:8090/links",
        },
      ],
    };

  },
  methods: {
    edit() {
      this.$router.push('/sheets/links')
    }
  }
};
</script>

<style lang="scss" scoped>
</style>