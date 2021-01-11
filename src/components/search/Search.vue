<template>
  <div id="Search">
    <HeadNavigation></HeadNavigation>
  </div>
</template>

<script>
import HeadNavigation from "../common/HeadNavigation";
export default {
  name: "Search",
  components: { HeadNavigation },
  data() {
    return {
      previous: "", // 记录先前一页
      content: "search",
    };
  },
};
</script>

<style>
</style>