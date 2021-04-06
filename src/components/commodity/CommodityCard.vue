<template>
  <div id="CommodityCard">
    <!-- 根据奇偶左右排序 -->
    <div
      v-for="(item, index) in commoditys"
      :key="index"
      class="tiles-wrap"
      style="display: block; height: 100%"
    >
      <li class="half-left-card">
        <van-image width="100%" height="auto" :src="item.little_image" />
        {{ item.intro }}
      </li>
    </div>
  </div>
</template>

<script>
import { commodityCardDemo } from "@/demo/commoditycarddemo";
export default {
  name: "CommodityCard",
  components: [commodityCardDemo],
  data() {
    return {
      commoditys: [],
    };
  },
  created() {
    this.commoditys = commodityCardDemo;
  },
};
</script>

<style scoped>
/* 商品流式布局 */
.tiles-wrap li {
  -moz-box-sizing: border-box;
  /* box-sizing: border-box; */
}
.tiles-wrap li {
  display: block;
  opacity: 1;
  text-align: center;
  list-style-type: none;
  background-color: #fff;
  float: left;
  cursor: pointer;
  width: 46%;
  padding: 2px;
  margin-right: 5px;
  margin-left: 5px;
  border-radius: 2px;
  overflow: auto;
}

.tiles-wrap {
  position: relative;
  margin: 10px 0;
  padding: 0;
  list-style-type: none;
  display: block;
  height: 100%;
}
</style>