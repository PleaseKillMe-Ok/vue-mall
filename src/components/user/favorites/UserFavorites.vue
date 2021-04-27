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
      disabled: true, // 是否开启底部按钮
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
/* 底部固定栏 */
.fix {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
  background-color: #fff;
  -webkit-user-select: none;
  user-select: none;
}

.choice-all {
}
</style>