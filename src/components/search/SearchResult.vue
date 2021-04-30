<template>
  <div id="SearchResult">
    <div v-if="searchResult.length === 0" style="margin-top: 50%">
      搜索不到任何商品
    </div>

    <div v-else>
      <van-cell
        v-for="(item, index) in keywordList"
        :key="index"
        is-link
        :to="{
          name: 'SearchCard',
          query: { previous: $route.path, keyword: item },
        }"
        :value="item"
      >
      </van-cell>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchResult",
  props: {
    searchResult: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      keywordList: [], // 解析后的关键字列表
      loading: false,
      finished: false,
    };
  },
  created() {
    this.searchResult.forEach((element) => {
      this.keywordList.push(element.commodity_name);
    });
  },
  watch: {
    searchResult() {
      this.keywordList = [];
      this.searchResult.forEach((element) => {
        this.keywordList.push(element.commodity_name);
      });
    },
  },
  methods: {},
};
</script>

<style scoped>
.a {
  color: black;
}
</style>