<template>
  <div id="UserFavorites">
    <!-- 最顶部工具栏 -->
    <van-nav-bar
      title="我的收藏"
      :left-arrow="true"
      :right-text="rightTitle"
      @click-left="goBack"
      @click-right="manager"
    >
    </van-nav-bar>
    <van-tabs v-model="active" animated type="card">
      <van-tab title="商品">
        <FavoritesCommodity :isOpenManage="isOpenManage"></FavoritesCommodity>
      </van-tab>
      <van-tab title="店铺">
        <FavoritesStore :isOpenManage="isOpenManage"></FavoritesStore>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
const FavoritesCommodity = () =>
  import("@/components/user/favorites/FavoritesCommodity");

export default {
  name: "UserFavorites",
  components: { FavoritesCommodity },
  data() {
    return {
      active: 0, // 默认选中第一个标签页
      isOpenManage: false, // 是否开启收藏商品管理
      rightTitle: "管理",
      title: "我的收藏",
      tabs: ["商品", "店铺"],
    };
  },
  created() {},
  methods: {
    // 开启/关闭商品管理
    manager() {
      if (this.isOpenManage) {
        this.rightTitle = "管理";
      } else {
        this.rightTitle = "完成";
      }
      this.isOpenManage = !this.isOpenManage;
    },
    // 回到个人面板
    goBack() {
      this.$router.push({ name: "Individual" });
    },
  },
};
</script>

<style scoped>
</style>