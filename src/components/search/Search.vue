<template>
  <div id="Search">
    <!-- 搜索导航栏 -->
    <SearchNavigation
      @displayResult="displayResult"
      :previous="previous"
    ></SearchNavigation>
    <div style="margin-top: 46px"></div>
    <div v-if="showResult">
      <SearchResult :searchResult="searchResult"></SearchResult>
    </div>
    <div v-else>
      <!-- 历史搜索记录 -->
      <HistorySearch></HistorySearch>
      <!-- 热搜榜 -->
      <HeatSearch></HeatSearch>
    </div>
  </div>
</template>

<script>
const SearchNavigation = () => import("@/components/search/SearchNavigation");
const HistorySearch = () => import("@/components/search/HistorySearch");
const HeatSearch = () => import("@/components/search/HeatSearch");
const SearchResult = () => import("@/components/search/SearchResult");
export default {
  name: "Search",
  components: { SearchNavigation, HistorySearch, HeatSearch, SearchResult },
  data() {
    return {
      previous: "", // 记录先前一页
      content: "search",
      showResult: false,
      searchResult: [], // 搜索的数据集
    };
  },
  created() {
    this.previous = this.$route.query.previous;
  },
  methods: {
    displayResult(status, data) {
      this.showResult = status;
      this.searchResult = data;
    },
  },
};
</script>

<style scoped>
</style>