<template>
  <div id="SkuPropsSelector">
    <div class="card">
      <van-row>
        <van-col span="4">
          <img v-lazy="image" class="img" width="100%" height="auto" />
        </van-col>
        <van-col span="17"> ¥{{ defaultPrice }} </van-col>
        <van-col span="2">
          <van-icon name="close" @click="close"></van-icon>
        </van-col>
      </van-row>
      <!-- sku键和值 key:value -->
      <div v-for="(values, index) in propsValues" :key="index">
        <div class="prop-name">{{ values.name }}</div>
        <div class="prop-values">
          <van-button
            :id="value.id"
            v-for="(value, index) in values.sku_values"
            :key="index"
            :class="[
              'value-btn',
              {
                'value-btn-choice': index === choiceMap[values.name],
              },
            ]"
            @click="choiceValue(index, values.name, value.id)"
          >
            {{ value.value }}
          </van-button>
        </div>

        <van-divider></van-divider>
      </div>
      <van-row>
        <van-col span="4" class="buy-title"> 购买数量 </van-col>
        <van-col span="14" class="store">库存{{ storeCount }}件</van-col>
        <van-col span="6"><van-stepper v-model="buyCount" /></van-col>
      </van-row>
    </div>
    {{ skuList }}
  </div>
</template>

<script>
import { getEffectiveSku } from "@/api/commodity";
export default {
  name: "SkuPropsSelector",
  props: {
    propsValues: {
      type: Array,
      default: [],
    },
    commodityInformation: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      image: "https://img01.yzcdn.cn/vant/apple-1.jpg",
      buyCount: 1, // 购买数量
      active: -1,
      storeCount: 100, // 库存数量
      choiceMap: {}, // 选择sku属性项
      defaultPrice: 0, // 默认价格
      skuList: [], // sku列表
      skuValuesMap: {}, // key为属性名，value为属性值数组
    };
  },
  created() {
    this.defaultPrice = this.commodityInformation.favourable_price;
    this.getEffectiveSku();
  },
  watch: {
    propsValues() {
      // 为每个key构造选择项map, key为属性name， value 为值index
      this.propsValues.forEach((element) => {
        this.choiceMap[element.name] = -1;
      });
    },
  },
  methods: {
    // 获取该商品下所有的有效SKU
    getEffectiveSku() {
      getEffectiveSku()
        .then((res) => {
          this.skuList = res.data;
        })
        .catch((err) => {
          this.$toast.fail("获取数据失败,服务器开了会小差～");
        });
    },

    // 选择合适的map项
    choiceValue(index, name, id) {
      // index为choiceMap的下标,name为属性名
      this.$set(this.choiceMap, name, index);
      // 解析用户点击某一个类目后的其他类目的数据
      this.parseSku(id, name);
    },

    // 解析获取每一组可能的sku，组合成一个字典
    parseSku(id, key) {
      // id表示每个sku属性值的id， key表示每个sku属性名
      // 遍历skuList
      this.skuValuesMap = {};
      this.skuList.forEach((element) => {
        let properties = element.properties_r;
        // 校验每一个可能的sku中对应key的value值是否等于用户点击的value值

        if (properties[key] === id) {
          // 如果等于，遍历该map，组合新的skuValueMap
          for (let key in properties) {
            // 如果不存在this.skuValuesMap[key]数组，生成一个新数组
            if (isNaN(this.skuValuesMap[key]))
              this.$set(this.skuValuesMap, key, new Array()); // 绑定属性为响应式
            // 将每个id值推入skuValuesMap中
            this.skuValuesMap[key].push({
              id: properties[key],
              value: properties
            });
            // this.skuValuesMap[key].push(properties[key]);
          }
        }
      });
      console.log(this.skuValuesMap);
    },

    // 动态修改sku个属性值的状态
    modifySkuProp(name, id) {
      this.propsValues.forEach((element) => {
        if (element.name !== name) {
          let values = element.sku_values;
          for (let value in values) {
          }
        }
      });
    },

    // 关掉动作面板
    close() {
      this.$emit("closeSkuProps");
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

/* 属性值 */
.prop-values {
  text-align: left;
}
/* 值按钮 */
.value-btn {
  display: inline-block;
  margin-bottom: 10px;
  margin-left: 15px;
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

/* 没有库存了 */
</style>