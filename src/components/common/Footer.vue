<template>
  <div id="footer" class="acea-row row-middle">
    <router-link
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
    </router-link>
  </div>
</template>

<script>
    export default {
      name: "Footer",
      props:{},
      data:function () {  // 数据域方法
        return {
          footerList:[
            {
              name: "首页",
              icon: "",
              iconName: "",
              url: "/"
            },
            {
              name: "消息",
              icon: "",
              iconName: "",
              url: "/message"
            },
            {
              name: "购物车",
              icon: "",
              iconName: "",
              url: "/trolley"
            },
            {
              name: "我的",
              icon: "",
              iconName: "",
              url: "/user"
            }
          ]
        };
      },
      methods:{}
    };
</script>

