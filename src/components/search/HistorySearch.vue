<template>
  <div id="HistorySearch">
    <div class="history-title">
      <span>
        历史搜索
        <van-icon
          class="history-delete"
          name="delete-o"
          @click="deleteAllHistory"
        ></van-icon>
      </span>
    </div>
    <div class="data">
      <van-button v-for="(key, index) in historyList" :key="index" round>
        {{ key }}
      </van-button>
    </div>
  </div>
</template>

<script>
import { getHistory, deleteHistory } from "@/api/search.js";
export default {
  name: "HistorySearch",
  data() {
    return {
      historyList: [],
    };
  },

  created() {
    // 请求API获取用户浏览记录
    this.getHistory();
  },
  methods: {
    deleteAllHistory() {
      // 删除全部历史数据
      this.$dialog
        .confirm({
          title: "删除确认",
          message: "确认删除全部历史记录？",
        })
        .then(() => {
          deleteHistory(true)
            .then((res) => {
              let data = res.data;
              if (data.code === 1022) {
                this.historyList = [];
              }
            })
            .catch((err) => {
              this.$toast.fail("服务器开了会小差～，删除失败");
            });
        })
        .catch(() => {});
    },
    getHistory() {
      // 获取历史数据
      getHistory()
        .then((res) => {
          this.historyList = res.data.data;
        })
        .catch((err) => {
          this.$toast.fail("获取历史数据失败");
        });
    },
  },
};
</script>

<style scoped>
#HistorySearch {
  background-color: rgb(252, 252, 252);
}
/* 历史标题 */
.history-title {
  text-align: left;
  margin: -10px 15px 0px 20px;
  font-size: 18px;
  padding-top: 20px;
  font-weight: bold;
}
/* 删除图标 */
.history-delete {
  float: right;
  font-size: 25px;
  opacity: 0.7;
}
/* 数据集合 */
.data {
  margin: 0px 20px 10px 5px;
  padding-top: 5px;
  padding-bottom: 10px;
  text-align: left;
}
/* 数据button */
.data button {
  background-color: rgb(248, 248, 248);
  margin: 5px 10px 5px 10px;
}
/* 每个关键词项*/
.van-button {
  margin-top: 15px;
  margin-bottom: 5px;
}
</style>