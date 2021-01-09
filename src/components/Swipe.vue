<template>
  <div id="CarouselMap">
    <van-swipe
      class="my-swipe"
      :autoplay="3000"
      indicator-color="white"
      :lazy-render="lazy_render"
    >
      <van-swipe-item
        :key="index"
        v-for="(image, index) in swipe_list"
        @click="redirect(index)"
      >
        <!-- TODO: CSS布局-->
        <!-- <img :class="image_class" :src="image" /> -->
        {{ image.image_url }}
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>

export default {
  name: "CarouselMap",
  data() {
    return {
      swipe_list: [
        {
          image_url: "https://img.yzcdn.cn/vant/apple-1.jpg",
          next_url: "/", // 图片详情商品页/活动页
        },
        {
          image_url: "https://img.yzcdn.cn/vant/apple-1.jpg",
          next_url: "/",
        },
        {
          image_url: "https://img.yzcdn.cn/vant/apple-1.jpg",
          next_url: "/",
        },
      ],
      image_class: "image-class",
      lazy_render: true,
    };
  },
  methods: {
    redirect(index) {
      let cur_next = this.swipe_list[index].next_url; // 跳转详情页路由
    },
  },
};
</script>

<style scoped>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 200px;
  text-align: center;
  background-color: #39a9ed;
}
</style>
