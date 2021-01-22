<template>
  <div id="Search">
    <!-- 搜索导航栏 -->
    <HeadNavigation @displayResult="displayResult"></HeadNavigation>
    <div v-if="showResult">
      <SearchResult></SearchResult>
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
const HeadNavigation = () => import("@/components/common/HeadNavigation");
const HistorySearch = () => import("@/components/search/HistorySearch");
const HeatSearch = () => import("@/components/search/HeatSearch");
const SearchResult = () => import("@/components/search/SearchResult");
export default {
  name: "Search",
  components: { HeadNavigation, HistorySearch, HeatSearch, SearchResult },
  data() {
    return {
      previous: "", // 记录先前一页
      content: "search",
      showResult:false
    };
  },
  methods:{
    displayResult(status){
      this.showResult = status
    }
  }
};
</script>

<style scoped>
</style>