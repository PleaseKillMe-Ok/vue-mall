<template>
  <!-- 用户足迹组件 -->
  <div id="UserFoot">
    <!-- 足迹商品操作动作面板 -->
    <van-action-sheet v-model="showOp" cancel-text="取消" close-on-click-action>
      <van-row type="flex" justify="center">
        <van-grid
          :column-num="2"
          :gutter="30"
          icon-size="30"
          direction="horizontal"
          :border="false"
        >
          <van-grid-item icon="star-o" text="收藏" @click="addFacorites" />
          <van-grid-item
            icon="delete-o"
            text="删除"
            @click="deleteSingleFoot"
          />
        </van-grid>
      </van-row>
    </van-action-sheet>

    <!-- 头部导航栏 -->
    <van-nav-bar
      :title="title"
      :left-arrow="hasLeft"
      @click-right="openDelete"
      @click-left="goBack"
    >
      <template #right>
        <van-icon name="delete-o" size="22"></van-icon>
      </template>
    </van-nav-bar>

    <!-- 日期 -->
    <van-row type="flex" justify="center">
      <van-col
        span="3"
        v-for="(day, index) in weekDay"
        :key="index"
        class="figure-1"
      >
        <span v-if="curDay === index" style="color: red">{{ day }}</span>
        <span v-else>{{ day }}</span>
      </van-col>
    </van-row>
    <van-row type="flex" justify="center">
      <van-col span="3" v-for="(day, index) in date" :key="index">
        <span class="figure-2">{{ day }}</span>
      </van-col>
    </van-row>

    <!-- 足迹索引栏 -->
    <div v-if="Object.keys(footDict).length === 0" class="empty">
      没有浏览足迹,去首页逛逛吧~
    </div>
    <div v-else>
      <div v-for="(footList, key, i) in footDict" :key="i">
        <p class="dateStr">{{ key }}</p>
        <van-row justify="center" gutter="2">
          <van-col
            v-for="(item, j) in footList"
            :key="j"
            class="commodifyItem"
            span="8"
          >
            <van-image
              width="100%"
              height="135"
              fit="cover"
              src="https://img01.yzcdn.cn/vant/cat.jpeg"
            />
            <van-cell center>
              <template #title>
                <p>{{ item.commodityName }}</p>
                <span class="money">¥ {{ item.price }}</span>
              </template>
              <template #default>
                <van-icon
                  name="ellipsis"
                  class="search-icon"
                  size="16px"
                  @click="displayOp(j)"
                />
              </template>
            </van-cell>
          </van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>

<script>
import { displayFoot, deleteSingleFoot } from "@/api/foot";
export default {
  name: "UserFoot",
  data() {
    return {
      title: "我的足迹",
      previousPage: "Individual",
      showOp: false, // 是否显示操作面板
      hasLeft: true,
      weekDay: ["日", "一", "二", "三", "四", "五", "六"],
      date: [],
      footDict: {
        "2020-03-25": [
          {
            id: 1,
            commodityName: "避孕套",
            price: 200,
            discounts: 0.95,
            image:
              "https://django-e-mall.oss-cn-shanghai.aliyuncs.com/01_mid.jpg",
            status: true,
          },
          {
            id: 1,
            commodityName: "避孕套",
            price: 200,
            discounts: 0.95,
            image:
              "https://django-e-mall.oss-cn-shanghai.aliyuncs.com/01_mid.jpg",
            status: true,
          },
          {
            id: 1,
            commodityName: "避孕套",
            price: 200,
            discounts: 0.95,
            image:
              "https://django-e-mall.oss-cn-shanghai.aliyuncs.com/01_mid.jpg",
            status: true,
          },
          {
            id: 1,
            commodityName: "避孕套",
            price: 200,
            discounts: 0.95,
            image:
              "https://django-e-mall.oss-cn-shanghai.aliyuncs.com/01_mid.jpg",
            status: true,
          },
        ],
        "2020-03-24": [
          {
            id: 1,
            commodityName: "避孕套",
            price: 200,
            discounts: 0.95,
            image:
              "https://django-e-mall.oss-cn-shanghai.aliyuncs.com/01_mid.jpg",
            status: true,
          },
        ],
        "2020-03-23": [
          {
            id: 1,
            commodityName: "避孕套",
            price: 200,
            discounts: 0.95,
            image:
              "https://django-e-mall.oss-cn-shanghai.aliyuncs.com/01_mid.jpg",
            status: true,
          },
        ],
      },
      curDay: 0,
    };
  },
  created() {
    if (this.$route.query.previous) {
      this.previousPage = this.$route.query.previous;
    }
    // 设置当前日期所在周的第几天
    this.setCurDate();
    // 获取足迹数据
    this.getFootData();
  },
  methods: {
    // 开启删除功能
    openDelete() {},
    // 返回上一页
    goBack() {
      this.$router.push({ name: this.previousPage });
    },
    // 设置当前日期所在周的第几天
    setCurDate() {
      let date = new Date();
      this.curDay = date.getDay();
    },

    // 获取足迹数据
    getFootData() {
      let load = this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
      displayFoot()
        .then((res) => {
          let result = res.data;
          result.data.forEach((element) => {
            let daystr = this.parseTimestamp(element.timestamp); // 时间戳 --> 日期字符串
            if (!daystr in this.footDict) {
              // 如果字典中尚未存在当前日期下的记录,则创建一数组存储记录信息
              this.footDict[daystr] = [];
            }
            // 向数组中添加信息
            this.footDict[daystr].push({
              id: element.id,
              commodityName: element.commodity_name,
              price: element.price,
              discounts: element.discounts,
              image: element.image,
              status: element.status,
            });
          });
          load.clear();
        })
        .catch((err) => {
          this.$toast.fail("服务器开了会儿小差");
        });
    },

    //  时间戳 --> 日期字符串
    // 202101071610024776
    parseTimestamp(timestamp) {
      let prefix = timestamp.substring(0, 8);
      let year = prefix.substring(0, 4);
      let month = prefix.substring(4, 6);
      let day = prefix.substring(6, 8);
      return year + "-" + month + "-" + day;
    },

    // 显示操作面板
    displayOp(index) {
      this.showOp = true;
      this.readyForDeleteId = index; // 即将要删除的足迹的id
    },

    // 将商品假如收藏夹
    addFavorites() {
      this.showOp = false;
      let load = this.$toast.loading({
        message: "收藏中...",
        forbidClick: true,
      });
      addFavorites(this.readyForDeleteId)
        .then((res) => {
          load.clear();
        })
        .catch((err) => {
          this.$toast.fail("服务器开了会儿小差~");
        });
    },

    // 将足迹删除
    deleteSingleFoot() {
      this.showOp = false;
      let load = this.$toast.loading({
        message: "删除中...",
        forbidClick: true,
      });
      console.log(this.readyForDeleteId);
      deleteSingleFoot(this.readyForDeleteId)
        .then((res) => {
          if (res.status === 204) {
            load.clear();
            this.$toast.success("删除成功");

            // TODO:动态更新DOM元素
          }
        })
        .catch((err) => {
          this.$toast.fail("服务器开了会儿小差~");
        });
    },
  },
};
</script>

<style scoped>
#UserFoot {
  background-color: #f7f8fa;
}
.figure-1 {
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 16px;
  color: grey;
  opacity: 0.8;
}

/* 商品item */
.commodifyItem {
  width: 33.333%;
  float: left;
  box-shadow: 0px 1px 2px whitesmoke;
}

.empty {
  margin-top: 100px;
}

/* 记录足迹的时间 */
.dateStr {
  font-size: 16px;
  display: block;
  color: grey;
  opacity: 0.9;
}

.money {
  color: red;
}
</style>