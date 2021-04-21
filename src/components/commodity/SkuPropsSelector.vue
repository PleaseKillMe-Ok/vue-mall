<template>
  <div id="SkuPropsSelector">
    <div class="card">
      <van-row>
        <van-col span="5">
          <img v-lazy="image" class="img" width="100%" height="auto" />
        </van-col>
        <van-col span="14" class="sku-price">
          <!-- 根据是否选中sku，计算价格和库存-->
          <div id="price">
            <span v-if="chosePropsList.length < propsValues.length">
              ¥{{ defaultPrice }}</span
            >
            <span
              v-else-if="
                chosePropsList.length === propsValues.length &&
                skuFavourablePrice < skuPrice
              "
            >
              ¥{{ skuFavourablePrice }}
              <span class="sku-favourable-price">¥{{ skuPrice }}</span>
            </span>
            <span v-else-if="chosePropsList.length === propsValues.length"
              >¥{{ skuPrice }}
            </span>
          </div>
        </van-col>
        <van-col span="3">
          <van-icon name="close" @click="close"></van-icon>
        </van-col>
      </van-row>
      <!-- sku键和值 key:value -->
      <div v-for="(values, index) in propsValues" :key="index">
        <div class="prop-name">{{ values.name }}</div>
        <div class="prop-values">
          <van-button
            :id="value.id"
            v-for="(value, index2) in values.sku_values"
            :key="index2"
            :class="[
              'value-btn',
              {
                'value-btn-choice': index2 === choiceMap[values.name],
              },
            ]"
            :disabled="!value.status"
            @click="choiceValue(index, index2, values.name, value.id)"
          >
            {{ value.value }}
          </van-button>
        </div>

        <van-divider></van-divider>
      </div>
      <van-row>
        <van-col span="4" class="buy-title"> 购买数量 </van-col>
        <van-col span="14" class="store">
          库存
          <span>{{ skuStock }}</span>
        </van-col>
        <van-col span="6"
          ><van-stepper
            ref="stepper"
            v-model="buyCount"
            :disable-plus="buyCount >= skuStock"
            theme="round"
            button-size="20"
        /></van-col>
      </van-row>
      <div class="van-sku-actions">
        <van-button type="danger" size="large" @click="joinCart"
          >加入购物车</van-button
        >
        <van-button type="warning" size="large" @click="buy"
          >立即购买</van-button
        >
      </div>
    </div>
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
      choiceMap: {}, // 选择sku属性项
      defaultPrice: 0, // 默认价格
      defaultStore: 0, // 默认商品总库存
      skuList: [], // sku列表
      skuValuesMap: {}, // key为属性名，value为属性值数组
      chosePropsList: [], // 维护用户已经点击的类目数组下标
      preDict: {}, // 用户每次选择类目后的字典数据
      skuPrice: 0, // 选中的sku价格
      skuStock: 0, // 选中的sku库存容量
      skuSidRelation: {}, // 存储sku的Sid和sku其他信息映射关系,
      skuFavourablePrice: 0, // sku的优惠价
    };
  },
  created() {
    this.defaultPrice = this.commodityInformation.favourable_price; // 默认价格
    this.defaultStore = this.commodityInformation.stock; // 默认总库存
    this.skuStock = this.defaultStore;
    this.skuPrice = this.defaultPrice;
    this.getEffectiveSku();
  },
  watch: {
    // 当propsValues由父-->子执行
    propsValues(newName, oldName) {
      // 为每个key构造选择项map, key为属性name， value 为值index
      newName.forEach((element) => {
        this.choiceMap[element.name] = -1;
      });
    },
    // 当skuList数据获取成功执行
    skuList(newName, oldName) {
      this.parseSkuExtra(newName); // 解析sku额外信息
    },
    // 当用户选择/取消某个类目时
    chosePropsList(newName, oldName) {
      console.log(typeof newName);
    },
    // 修改步进器
    buyCount(newName, oldName) {},
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
    choiceValue(outIndex, InnerIndex, name, valueId) {
      // 修改可用的类目状态和不可用的类目显示
      // 解析出用户点击某一个类目后的其他有效类目的数据
      this.parseSku(valueId, name);
      if (!this.propsValues[outIndex].sku_values[InnerIndex].is_choice) {
        // 当前类目值未被选中
        if (!this.chosePropsList.includes(outIndex)) {
          this.chosePropsList.push(outIndex); // 避免重复添加
          this.preDict[name] = valueId; // 向前缀字典中添加键值对，{name:valueId}
        }
        // index为choiceMap的下标,name为属性名
        this.$set(this.choiceMap, name, InnerIndex); // 修改选中样式
        this.modifyStatus(); // 状态进入
        // 先全部设置为false，然后只对选中的设置为true
        for (let i = 0; i < this.propsValues[outIndex].sku_values.length; i++) {
          this.propsValues[outIndex].sku_values[i].is_choice = false;
        }
        this.propsValues[outIndex].sku_values[InnerIndex].is_choice = true;
        this.computeSku();
      } else {
        // 当类目值被选中
        let i = this.chosePropsList.indexOf(outIndex); // 获取下标
        this.chosePropsList.splice(i, 1); // 删除类目值所在的类目名
        this.$set(this.choiceMap, name, -1); // 取消选中，样式变化
        this.backModifyStatus(); // 状态回朔
        // 只对选中的设置为false，其他已经是false
        this.propsValues[outIndex].sku_values[InnerIndex].is_choice = false;
        this.computeSku();
      }
    },

    // 解析获取每一组可能的sku，组合成一个字典，判断当前sku记录是否满足前缀条件
    parseSku(valueId, key) {
      // valueId表示每个sku属性值的id， key表示每个sku属性名
      // 遍历skuList

      // 如果前缀字典中有key，先删除，方便同类目下切换属性值
      if (this.preDict.hasOwnProperty(key)) delete this.preDict[key];

      this.skuValuesMap = {};
      for (let i = 0; i < this.skuList.length; i++) {
        let flag = true; // 满足要求
        let properties = this.skuList[i].properties_r;
        // 校验每一个可能的sku中对应key的value值是否等于用户点击的value值
        if (properties[key] === valueId) {
          // 如果等于，遍历时需要考虑其所有前缀
          for (let preKey in this.preDict) {
            if (
              this.preDict[preKey] == null ||
              this.preDict[preKey] != properties[preKey]
            ) {
              flag = false;
              break;
            }
          }
          if (!flag) continue; // 继续遍历下一条有效的sku记录
          // 构造字典数组
          for (let pkey in properties) {
            // 为空，为类目名构造数组
            if (this.skuValuesMap[pkey] == null) {
              this.$set(this.skuValuesMap, pkey, new Array());
            }
            // 如果类目名数组中存在相同类目值，跳过
            else if (this.skuValuesMap[pkey].includes(properties[pkey])) {
              continue;
            }
            this.skuValuesMap[pkey].push(properties[pkey]);
          }
        }
      }
    },

    // 解析sku的额外信息
    parseSkuExtra(skuList) {
      skuList.forEach((element) => {
        let sid = element.sid.split("-").sort().join("-");
        this.skuSidRelation[sid] = {
          favourablePrice: element.favourable_price,
          price: element.price,
          stock: element.stock,
        };
      });
    },

    // 修改可用的类目状态和不可用的类目显示
    modifyStatus() {
      for (let i = 0; i < this.propsValues.length; i++) {
        // 过滤出类目数组中还未选中类目下标
        // if (!this.chosePropsList.includes(i)) {
        let skuValues = this.propsValues[i].sku_values; // 类目值数组
        let name = this.propsValues[i].name; // 类目名
        // 先将状态全部设置为false
        for (let j = 0; j < skuValues.length; j++) {
          this.propsValues[i].sku_values[j].status = false;
        }
        // 如果有效类目数组存在于skuValuesMap字典中，则将其类目下的有效属性值的状态设置为true
        for (let m = 0; m < skuValues.length; m++) {
          if (this.skuValuesMap[name] != null) {
            for (let n = 0; n < this.skuValuesMap[name].length; n++) {
              if (skuValues[m].id == this.skuValuesMap[name][n]) {
                // 如果id存在并且库存>0
                this.propsValues[i].sku_values[m].status = true;
              }
            }
          }
        }
      }
    },

    // 用户取消某个类目值，状态回朔
    backModifyStatus() {
      this.skuValuesMap = {};
      for (let i = 0; i < this.skuList.length; i++) {
        let flag = true; // 满足要求
        let properties = this.skuList[i].properties_r;
        // 校验每一个可能的sku中对应key的value值是否等于用户点击的value值
        for (let preKey in this.preDict) {
          if (
            this.preDict[preKey] == null ||
            this.preDict[preKey] != properties[preKey]
          ) {
            flag = false;
            break;
          }
        }
        if (!flag) continue; // 继续遍历下一条有效的sku记录
        // 构造字典数组
        for (let pkey in properties) {
          // 为空，为类目名构造数组
          if (this.skuValuesMap[pkey] == null) {
            this.$set(this.skuValuesMap, pkey, new Array());
          }
          // 如果类目名数组中存在相同类目值，跳过
          else if (this.skuValuesMap[pkey].includes(properties[pkey])) {
            continue;
          }
          this.skuValuesMap[pkey].push(properties[pkey]);
        }
      }
      this.modifyStatus(); // 再次更新状态
    },

    // 根据指定的有效sku，计算出对应的价格和库存
    computeSku() {
      // 获取用户选中的类目值, 拼接成sid
      let sidList = new Array();
      for (let key in this.choiceMap) {
        if (this.preDict[key] != null)
          sidList.push(this.preDict[key].toString());
      }
      let sid = sidList.sort().join("-");
      if (this.skuSidRelation.hasOwnProperty(sid)) {
        this.skuPrice = parseFloat(this.skuSidRelation[sid].price);
        this.skuFavourablePrice = parseFloat(
          this.skuSidRelation[sid].favourablePrice
        );
        this.skuStock = parseInt(this.skuSidRelation[sid].stock);
      } else {
        // 一直处于默认的price和stock
        this.skuPrice = this.defaultPrice;
        this.skuStock = this.defaultStore;
      }
    },

    // 加入购物车
    joinCart() {
      if (this.chosePropsList.length < this.propsValues.length)
        this.$toast("请选择商品规格");
      else if (this.skuStock < 0) {
        this.$toast("该规格的商品卖完了");
      } else if (this.skuStock < this.buyCount) {
        this.$toast("规格数量无效");
      } else {
        let data = this.collectSku();
        this.$toast("加入成功");
      }
    },

    // 立即购买
    buy() {
      if (this.chosePropsList.length < this.propsValues.length)
        this.$toast("请选择商品规格");
      else if (this.skuStock < 0) {
        this.$toast("该规格的商品卖完了");
      } else if (this.skuStock < this.buyCount) {
        this.$toast("规格数量无效");
      } else {
        let data = this.collectSku();
        console.log(data);
        this.$toast("立即购买");
      }
    },

    // 收集用户选中的sku信息
    collectSku() {
      let data = JSON.stringify({
        sku: this.preDict,
        buy_count: this.buyCount,
      });
      return data;
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
  margin-bottom: 5px;
  margin-left: 12px;
  border-radius: 25px;
  background-color: #96979917;
  height: 20px;
  border-style: none;
}

/* 选中按钮颜色变化 */
.value-btn-choice {
  border-color: #fd7038;
  color: #fd7038;
  border-style: solid;
}

/* sku的原价格 */
.sku-price {
  text-align: left;
  margin-left: 20px;
  font-weight: bolder;
  font-size: 22px;
  color: red;
}
/* sku优惠价 */
.sku-favourable-price {
  margin-left: 15px;
  font-size: 15px;
  vertical-align: center;
  text-decoration: line-through;
  color: grey;
  opacity: 0.9;
}
</style>