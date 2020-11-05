<template>
  <el-row
    :gutter="10"
    class="panel-group"
  >
    <el-col
      :xs="12"
      :sm="12"
      :lg="6"
      class="card-panel-col"
    >
      <div
        class="card-panel"
        @click="handleSetLineChartData('newVisitis')"
      >
        <div class="card-panel-description">
          <div class="card-panel-text">
            文章
          </div>
          <count-to
            :start-val="0"
            :end-val="102400"
            :duration="2600"
            class="card-panel-num"
          />
        </div>
        <el-tooltip
          content="添加文章"
          effect="dark"
          placement="bottom"
        >
          <div
            class="card-panel-icon-wrapper"
            @click="articleAdd"
          >
            <svg-icon
              icon-class="add"
              class-name="card-panel-icon"
            />
          </div>
        </el-tooltip>

      </div>
    </el-col>
    <el-col
      :xs="12"
      :sm="12"
      :lg="6"
      class="card-panel-col"
    >
      <div
        class="card-panel"
        @click="handleSetLineChartData('messages')"
      >
        <el-tooltip
          content="评论管理"
          effect="dark"
          placement="bottom"
        >
          <div
            class="card-panel-icon-wrapper"
            @click="openComment"
          >
            <svg-icon
              icon-class="list"
              class-name="card-panel-icon"
            />
          </div>
        </el-tooltip>
        <div class="card-panel-description">
          <div class="card-panel-text">
            评论
          </div>
          <count-to
            :start-val="0"
            :end-val="81212"
            :duration="3000"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>
    <el-col
      :xs="12"
      :sm="12"
      :lg="6"
      class="card-panel-col"
    >
      <div
        class="card-panel"
        @click="handleSetLineChartData('purchases')"
      >
        <el-tooltip
          content="文章总阅读量"
          effect="dark"
          placement="bottom"
        >
          <div class="card-panel-icon-wrapper">
            <svg-icon
              icon-class="help"
              class-name="card-panel-icon"
            />
          </div>
        </el-tooltip>
        <!-- <read-view-icon></read-view-icon> -->
        <div class="card-panel-description">
          <div class="card-panel-text">
            阅读量
          </div>
          <count-to
            :start-val="0"
            :end-val="9280"
            :duration="3200"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>
    <el-col
      :xs="12"
      :sm="12"
      :lg="6"
      class="card-panel-col"
    >
      <div
        class="card-panel"
        @click="handleSetLineChartData('shoppings')"
      >
        <el-tooltip
          content="博客建立于2020-03-01"
          effect="dark"
          placement="bottom"
        >
          <div class="card-panel-icon-wrapper">
            <svg-icon
              icon-class="help"
              class-name="card-panel-icon"
            />
          </div>
        </el-tooltip>
        <div class="card-panel-description">
          <div class="card-panel-text">
            运行天数
          </div>
          <count-to
            :start-val="0"
            :end-val="13600"
            :duration="3600"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from "vue-count-to";
import AddArticleIcon from "@/components/AddArticleIcon";
import ReadViewIcon from "@/components/ReadViewIcon";
export default {
  components: {
    CountTo,
    AddArticleIcon,
    ReadViewIcon,
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit("handleSetLineChartData", type);
    },
    articleAdd() {
      this.$router.push("/article/add");
    },
    openComment() {
      this.$router.push("/comments");
    },
  },
};
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);

    .card-panel-icon-wrapper {
      float: right;
      margin: 14px 14px 0 0;
      color: #40c9c6;
      font-size: 20px;
      transition: all 0.38s ease-out;
    }

    .card-panel-description {
      float: left;
      margin: 15px 0 0 15px;

      .card-panel-text {
        color: rgba(0, 0, 0, 0.45);
        font-size: 14px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width: 550px) {
  // .card-panel-description {
  //   display: none;
  // }
}
</style>
