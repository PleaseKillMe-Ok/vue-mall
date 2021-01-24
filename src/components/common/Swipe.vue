<template>
  <div id="Swipe">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item>请求后台API轮播</van-swipe-item>
      <van-swipe-item
        v-for="(swipe, index) in swipeList"
        :key="index"
        @click="accessDetail(swipe.url)"
      >
        <img :src="swipe.pic" :class="picture" />
      </van-swipe-item>
    </van-swipe>
    
  </div>
</template>

<script>
export default {
  name: "Swipe",
  data() {
    return {
      start: 0,
      swipeNumber: 6, // 轮播图最大个数
      swipeList: [], // 轮播图列表
      picture: "picture",
    };
  },
  methods: {
    // 请求API
    getSwipe() {
      this.$http
        .get("/api/banner/?type=2")
        // 成功回调
        .then((res) => {
          })
        // 失败的回调
        .catch((err) => {
          this.$toast.fail("服务器有点累~");
        });
    },
    // 计算取数据的区间
    computeRetrieve() {
      // this.rand = Math.ceil(Math.random() * 2); // 生成0-3之间的随机数
      // this.start = this.rand; // 生成随机start
      this.start = 0;
      this.end = this.start + this.swipeNumber;
    },
    // 进入给定地址
    accessDetail(url) {
      this.$router.push();
    },
  },
  created() {
    // 请求获取轮播图
    this.computeRetrieve();
    this.getSwipe();
  },
};
</script>

<style scoped>
.my-swipe .van-swipe-item {
  margin-top: 50px;
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
.picture {
  height: 220px;
}
</style>