<template>
  <div id="Search">
    <!-- 搜索导航栏 -->
    <HeadNavigation></HeadNavigation>
    <!-- 历史搜索记录 -->
    <HistorySearch></HistorySearch>
    <!-- 热搜榜 -->
    <HeatSearch></HeatSearch>
  </div>
</template>

<script>
import HeadNavigation from "../common/HeadNavigation";
import HistorySearch from "@/components/search/HistorySearch";
import HeatSearch from "@/components/search/HeatSearch";
export default {
  name: "Search",
  components: { HeadNavigation, HistorySearch, HeatSearch },
  data() {
    return {
      previous: "", // 记录先前一页
      content: "search",
    };
  },
};
</script>

<style scoped>
</style>