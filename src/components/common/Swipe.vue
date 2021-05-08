<template>
  <div id="Swipe">
    <van-swipe
      class="swipe"
      :autoplay="3000"
      indicator-color="white"
      width="100%"
      height="auto"
    >
      <van-swipe-item
        v-for="(swipe, index) in swipeList"
        :key="index"
        @click="accessDetail(swipe.url)"
      >
        <img :src="swipe.pic" :class="picture" width="100%" height="auto" />
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
      this.swipeList = [
        {
          pic:
            "https://vue-e-mall.oss-cn-beijing.aliyuncs.com/src%3Dhttp___m.360buyimg.com_mobilecms_s750x750_jfs_t17791_347_1064370232_210474_cb300c7b_5ab85845na531ffba.jpg%21q80.jpg%26refer%3Dhttp___m.360buyimg.jpeg",
        },
        {
          pic:
            "https://vue-e-mall.oss-cn-beijing.aliyuncs.com/7aec54e736d12f2e78d02dfb44c2d56284356850.png",
        },
      ];
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
.swipe {
  margin-top: 50px;
}

.my-swipe .van-swipe-item {
  margin-top: 50px;
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
.picture {
  height: 200px;
}
</style>