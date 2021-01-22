<template>
  <div id="HeatSearch">
    <p><span>图标:  </span>热搜榜</p>
    <div class="data">
      <p v-for="item in heatSearchList" :key="item.rank">
        <span>{{ item.rank }}</span>
        <span>{{ item.keyword }}</span>
      </p>
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
};
</script>

<style scoped>
/* 热搜榜布局 */
.data {
}
</style>