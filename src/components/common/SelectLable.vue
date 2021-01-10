<template>
  <van-grid square>
    <van-grid-item
      v-for="(item,index) in select_grid"
      :key="index"
      :icon="item.icon"
      :text="item.text"
      :replace="item.replace"
      :to="item.to"
      :clickable="item.clickable"
    />
  </van-grid>
</template>

<script>
export default {
  name: "SelectLable",
  data() {
    return {
      select_grid: [
        {
          icon: "photo-o", // 图标
          to: "/wqeqw", // 跳转的路由
          replace: true, // 是否点击跳转
          clickable: true, //是否可以点击
          text: "标签", // 文本内容
        },
        {
          icon: "photo-o", // 图标
          to: "/wqeqw", // 跳转的路由
          replace: true, // 是否点击跳转
          clickable: true, //是否可以点击
          text: "标签", // 文本内容
        },
        {
          icon: "photo-o", // 图标
          to: "/wqeqw", // 跳转的路由
          replace: true, // 是否点击跳转
          clickable: true, //是否可以点击
          text: "标签", // 文本内容
        },
        {
          icon: "photo-o", // 图标
          to: "/wqeqw", // 跳转的路由
          replace: true, // 是否点击跳转
          clickable: true, //是否可以点击
          text: "标签", // 文本内容
        },
        {
          icon: "photo-o", // 图标
          to: "/wqeqw", // 跳转的路由
          replace: true, // 是否点击跳转
          clickable: true, //是否可以点击
          text: "标签", // 文本内容
        },
        {
          icon: "photo-o", // 图标
          to: "/wqeqw", // 跳转的路由
          replace: true, // 是否点击跳转
          clickable: true, //是否可以点击
          text: "标签", // 文本内容
        },
        {
          icon: "photo-o", // 图标
          to: "/wqeqw", // 跳转的路由
          replace: true, // 是否点击跳转
          clickable: true, //是否可以点击
          text: "标签", // 文本内容
        },
        {
          icon: "photo-o", // 图标
          to: "/wqeqw", // 跳转的路由
          replace: true, // 是否点击跳转
          clickable: true, //是否可以点击
          text: "标签", // 文本内容
        },
      ],
    };
  },
  methods: {},
};
</script>

<style>
</style>