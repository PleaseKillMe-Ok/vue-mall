<template>
  <div id="Category">
    <!-- 头部导航栏组件 -->
    <HeaderLine></HeaderLine>
    <!-- 分类选择栏 -->
    <van-tree-select
      height="55vw"
      :items="items"
      :main-active-index.sync="active"
      class="tree-select"
    >
      <template #content>
        <van-image
          v-if="active === 0"
          src="https://img01.yzcdn.cn/vant/apple-1.jpg"
        />
        <van-image
          v-if="active === 1"
          src="https://img01.yzcdn.cn/vant/apple-2.jpg"
        />
      </template>
    </van-tree-select>
  </div>
</template>

<script>
const HeaderLine = () => import("@/components/common/HeaderLine");
export default {
  name: "Category",
  data() {
    return {
      active: 0,
      items: [{ text: "分组 1" }, { text: "分组 2" }],
    };
  },
  components: { HeaderLine },
  created() {
    this.getTopCategory();
  },
  method: {
    // 获取顶级类目
    getTopCategory() {
      getTopCategory()
        .then((res) => {
            let data = res.data;
        })
        .catch((err) => {
            this.$toast.fail('获取顶级目录失败')
        });
    },
  },
};
</script>

<style>
.tree-select {
  margin-top: 46px;
}
</style>