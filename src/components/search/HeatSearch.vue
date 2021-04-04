<template>
  <div id="HeatSearch">
    <div class="card">
      <div class="heat-title">
        <van-icon name="gem"></van-icon>
        <span class="title-master">每日热搜</span>
        <span class="title-slave">今日热搜全知道</span>
        <van-icon name="share-o" class="into" @click="toHeatRank"></van-icon>
      </div>

      <div class="data">
        <ul>
          <li v-for="item in heatSearchList" :key="item.rank">
            <span class="rank">{{ item.rank }}</span>
            <span>{{ item.keyword }}</span>
            <span class="hot">热</span>
            <span class="new">新</span>
            
            <van-icon class="arrow-up" name="arrow-up" />
            <van-icon class="arrow-down" name="arrow-down" />
            <span class="arrow-inherit">--</span>
            <van-divider />
          </li>
        </ul>
      </div>
      <div class="q"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeatSearch",
  data() {
    return {
      heatSearchList: [
        {
          keyword: "小米充电器",
          id: "12023211231",
          rank: 1,
        },
        {
          keyword: "小米充电器",
          id: "12023211231",
          rank: 2,
        },
        {
          keyword: "小米充电器",
          id: "12023211231",
          rank: 3,
        },
        {
          keyword: "小米充电器",
          id: "12023211231",
          rank: 4,
        },
        {
          keyword: "小米充电器",
          id: "12023211231",
          rank: 5,
        },
        {
          keyword: "小米充电器",
          id: "12023211231",
          rank: 6,
        },
        {
          keyword: "小米充电器",
          id: "12023211231",
          rank: 7,
        },
        {
          keyword: "小米充电器",
          id: "12023211231",
          rank: 8,
        },
        {
          keyword: "小米充电器",
          id: "12023211231",
          rank: 9,
        },
        {
          keyword: "小米充电器",
          id: "12023211231",
          rank: 10,
        },
      ],
    };
  },
  methods: {
    toHeatRank() {
      console.log("进入热搜榜");
    },
  },
};
</script>

<style scoped>
/* 热搜榜布局 */

.heat-title {
  text-align: left;
  width: 100%;
}
.title-master {
  color: rgb(129, 76, 36);
  font-weight: bold;
}
.title-slave {
  color: rgb(192, 76, 36);
  font-size: 16px;
}
.into {
  float: right;
  margin-right: 15px;
}
.data ul {
  text-align: left;
  margin: 20px 0px 10px 0px;
}
.data ul li span {
  font-size: 16px;
}
/* 排行榜名次 */
.rank {
  background: red;
  width: 17px;
  height: 17px;
  display:inline-block;
  text-align: center;
  color: whitesmoke;
  font-weight: bold;
  font-size: 15px !important;
  margin-right: 10px;
  border-radius: 25%;
}

/* 火热的标记 */
.hot {
  background: #fbe1e1;
  width: 17px;
  height: 17px;
  text-align: center;
  color: red;
  font-size: 14px !important;
  border-radius: 25%;
  border-width: 1px;
  border-style: solid;
  border-color: #f7b9b9;
}

/* 新的标记 */
.new {
  background: #f9f8ee;
  width: 17px;
  height: 17px;
  text-align: center;
  color: #e2c110;
  font-size: 14px !important;
  border-radius: 25%;
  border-width: 1px;
  border-style: solid;
  border-color: #ffed8b;
}
/* 排名上升箭头 */
.arrow-up{
  color: red;
  float: right;
}

/* 排名下降箭头 */
.arrow-down{
  color: blueviolet;
  float: right;
}

/* 排名不变 */
.arrow-inherit{
  color: gray;
  width: 15px;
  float: right;
}
</style>