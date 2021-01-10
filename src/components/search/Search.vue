<template>
<div>
    {{content}}
</div>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
        previous:'', // 记录先前一页
        content:'search'
    };
  },
};
</script>

<style>
</style>