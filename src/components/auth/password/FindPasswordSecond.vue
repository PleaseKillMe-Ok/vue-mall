<template>
  <div id="FindPasswordSecond">
    第二步
    <van-button
      block
      round
      color="linear-gradient(to right, #ff6034, #ee0a24)"
      size="large"
      class="next-btn"
      @click="next"
      >下一步</van-button
    >
  </div>
</template>

<script>
export default {
  name: "FindPasswordSecond",
  methods: {
    next() {},
  },
};
</script>

<style scoped>
/* 居中布局 */
.next-btn {
  margin-top: 30px;
  width: 50%;
  display: inline-block;
}
</style>