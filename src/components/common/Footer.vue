<template>
  <div id="Footer">

    <!-- vue-router跳转 -->
    <van-tabbar v-model="active" @change="onChange" route>
      <van-tabbar-item
        replace
        :to="item.to"
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
      cur_index:0,  // 跳转前一页
      footerList: [
        {
          name: "首页",
          icon: "home-o",
          iconName: "",
          to: "/",
        },
        {
          name: "消息",
          icon: "chat-o",
          iconName: "",
          to: "/message",
          badge: 10,
        },
        {
          name: "购物车",
          icon: "cart-o",
          iconName: "",
          to: "/cart",
          badge: 5,
        },
        {
          name: "个人中心",
          icon: "user-o",
          iconName: "",
          to: "/individual",
          badge: 8,
        },
      ],
    };
  },
  methods: {
    /* 底部栏切换事件 */
    onChange(index) {
      let head_information = { title: this.footerList[index].name, previous:this.footerList[index].to};
      this.$emit("head_info", head_information);
    },
  },
};
</script>

