<template>
  <div id="HistorySearch">
    <p class="history-title">
      历史搜索记录 <span class="history-delete">删除图标</span>
    </p>
    <div class="data">
      <van-button v-for="item in historyList" :key="item.index" round>
        {{ item.keyword }}
      </van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "HistorySearch",
  data() {
    return {
      historyList: [],
      idList: [],
    };
  },
  // 请求API获取用户浏览记录
  created() {
    // 模拟数据
    this.historyList = [
      {
        keyword: "华硕充电器",
        id: "12023211231",
      },
      {
        keyword: "华硕充电器",
        id: "12023211231",
      },
      {
        keyword: "华硕充电器",
        id: "12023211231",
      },
      {
        keyword: "华硕充电器",
        id: "12023211231",
      },
      {
        keyword: "华硕充电器",
        id: "12023211231",
      },
      {
        keyword: "华硕充电器",
        id: "12023211231",
      },
    ];
  },
};
</script>

<style scoped>
/* 历史标题 */
.history-title {
  text-align: left;
  margin: 20px 30px 0px 20px;
}
/* 删除图标 */
.history-delete {
  float: right;
}
/* 数据集合 */
.data{
    margin:10px 100px 10px 5px;
    padding-top: 10px;
    padding-bottom: 20px;
}
/* 每个关键词项*/
.van-button{
    margin-top: 15px;
    margin-bottom: 5px;
}
</style>