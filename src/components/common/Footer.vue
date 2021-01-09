<template>
  <div id="Footer">
    <!-- <router-link
      :to="item.url"
      class="item"
      :class="{ on:item.url === $route.path }"
      v-for="(item, index) in footerList"
      :key="index"
    >
      <div
        class="icon"
        :class="item.icon + ' ' +( item.url === $route.path ? item.iconName : '')"
      ></div>
      <div>{{ item.name }}</div>
    </router-link> -->

    <!-- vue-router跳转 -->
    <van-tabbar v-model="active" @change="onChange" route>
      <van-tabbar-item
        replace
        :to="item.url"
        :icon="item.icon"
        :badge="item.badge"
        v-for="(item, index) in footerList"
        :key="index"
        >{{ item.name }}</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>


<script>
import { Toast } from "vant";

export default {
  name: "Footer",
  data: function () {
    // 数据域
    return {
      active: 0,
      home: "首页",
      search: "搜索",
      message: "消息",
      cart: "购物车",
      individual: "个人",
      badge_message: 0,
      badge_user: 5,
      badge_cart: 19,
      footerList: [
        {
          name: "首页",
          icon: "home-o",
          iconName: "",
          url: "/",
        },
        {
          name: "搜索",
          icon: "search",
          iconName: "",
          url: "/search",
        },
        {
          name: "消息",
          icon: "chat-o",
          iconName: "",
          url: "/message",
          badge: 10,
        },
        {
          name: "购物车",
          icon: "cart-o",
          iconName: "",
          url: "/trolley",
          badge: 5,
        },
        {
          name: "个人中心",
          icon: "user-o",
          iconName: "",
          url: "/individual",
          badge: 8,
        },
      ],
    };
  },
  methods: {
    /* 底部栏切换事件 */
    onChange(index) {
      let head_information = { title: this.footerList[index].name};
      this.$emit("head_info", head_information);
      // Toast.success("切换到了" + index);
    },
  },
};
</script>

