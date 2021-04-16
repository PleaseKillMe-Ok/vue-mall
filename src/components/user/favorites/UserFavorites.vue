<template>
  <div id="UserFavorites">
    <!-- 最顶部工具栏 -->
    <TopTool :title="title"></TopTool>
    <van-tabs v-model="active" animated type="card">
      <van-tab title="商品">
        <FavoritesCommodity></FavoritesCommodity>
      </van-tab>
      <van-tab title="店铺">
        <FavoritesStore></FavoritesStore>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
const TopTool = () => import("@/components/user/TopTool");
const FavoritesCommodity = () =>
  import("@/components/user/favorites/FavoritesCommodity");

export default {
  name: "UserFavorites",
  components: { TopTool, FavoritesCommodity },
  data() {
    return {
      active: 0,
      title: "我的收藏",
      tabs: ["商品", "店铺"],
    };
  },
  created() {},
  methods: {
    
  },
};
</script>

<style scoped>
</style>