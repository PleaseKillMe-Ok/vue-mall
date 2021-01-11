<template>
  <div id="HeadImage">
    <van-nav-bar left-text="返回" left-arrow>
      <template #right>
        <van-image
          round
          width="10rem"
          height="10rem"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  name: "HeadImage",
  data() {
    return {};
  },
};
</script>

<style>
</style>