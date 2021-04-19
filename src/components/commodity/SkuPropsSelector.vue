<template>
  <div id="SkuPropsSelector">
    <div class="card">
      <van-row>
        <van-col span="4">
          <img v-lazy="image" class="img" width="100%" height="auto" />
        </van-col>

        <van-col span="17"> 价格 </van-col>
        <van-col span="2"> 删 </van-col>
      </van-row>
      <!-- props key:value -->
      <div v-for="(values, index) in propsValues" :key="index">
        <div class="prop-name">{{ values.name }}</div>
        <van-button
          v-for="(value, index) in values.sku_values"
          :key="index"
          :class="[
            'value-btn',
            { 'value-btn-choice': index === choiceMap[values.name] },
          ]"
          @click="choiceValue(index, values)"
        >
          {{ value.value }}
        </van-button>
        <van-divider></van-divider>
      </div>
      <van-row>
        <van-col span="4" class="buy-title"> 购买数量 </van-col>
        <van-col span="14" class="store">库存{{ storeCount }}件</van-col>
        <van-col span="6"><van-stepper v-model="buyCount" /></van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "SkuPropsSelector",
  props: {
    propsValues: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      image: "https://img01.yzcdn.cn/vant/apple-1.jpg",
      buyCount: 1, // 购买数量
      active: -1,
      storeCount: 100, // 库存数量
      choiceMap: {}, // 选择sku属性项
      testMap: {
        age: 22,
      },
    };
  },
  created() {},
  watch: {
    propsValues() {
      // 为每个key构造选择项map, key为属性name， value 为值index
      this.propsValues.forEach((element) => {
        this.choiceMap[element.name] = -1;
      });
    },
  },
  methods: {
    // 选择合适的map项
    choiceValue(index, values) {
      this.$set(this.choiceMap, values.name, index);
    },
  },
};
</script>

<style>
.img {
  float: left;
}

/* 购买数量标题 */
.buy-title {
  font-size: 16px;
  font-weight: bold;
}
/* 库存 */
.store {
  font-size: 14px;
  color: grey;
  vertical-align: middle;
  text-align: left;
  padding-left: 25px;
}

/* 属性名 */
.prop-name {
  text-align: left;
  font-size: 16px;
  margin-top: 20px;
  margin-bottom: 15px;
  font-weight: bold;
}

/* 值按钮 */
.value-btn {
  display: block;
  margin-bottom: 10px;
  border-radius: 15%;
  background-color: #96979917;
  height: 30px;
  border-style: none;
}

/* 选中按钮颜色变化 */
.value-btn-choice {
  border-color: #fd7038;
  color: #fd7038;
  border-style: solid;
}
</style>