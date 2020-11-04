<template>
  <div>
    <svg-icon
      icon-class="eye-open"
      @click="click"
    />
  </div>
</template>

<script>
export default {
  name: "BackToBlog",
  data() {
    return {};
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    click() {
      window.open("http://localhost:8080/", "_blank");
    },
  },
};
</script>

<style scoped>
.screenfull-svg {
  display: inline-block;
  cursor: pointer;
  fill: #5a5e66;
  width: 20px;
  height: 20px;
  vertical-align: 10px;
}
</style>
