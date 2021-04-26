<template>
  <div id="Category">
    <!-- 头部导航栏组件 -->
    <HeaderLine></HeaderLine>
    <!-- 分类选择栏 -->
    <van-tree-select
      height="690px"
      :items="items"
      :main-active-index.sync="active"
      class="tree-select"
    >
      <template #content>
        <div v-for="(content, index) in items" :key="index">
          <div v-if="active === index">
            第{{ items[index].pk }}级种类目录内容
          </div>
        </div>
      </template>
    </van-tree-select>
  </div>
</template>

<script>
const HeaderLine = () => import("@/components/common/HeaderLine");
import { getTopCategory } from "@/api/commodity";
export default {
  name: "Category",
  data() {
    return {
      active: 0,
      items: [], // 存放商品类目列表
    };
  },
  components: { HeaderLine },
  created() {
    this.getTopCategory();
  },
  watch: {
    active(newValue, oldValue) {
      let pk = this.items[newValue].pk; // 获取一级类目id
    },
  },
  methods: {
    // 获取顶级类目
    getTopCategory() {
      getTopCategory()
        .then((res) => {
          this.items = res.data;
        })
        .catch((err) => {
          this.$toast.fail("获取顶级目录失败");
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