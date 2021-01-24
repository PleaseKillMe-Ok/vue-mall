<template>
  <div id="TopTool">
    <van-nav-bar :title="title" right-text="更多" @click-right="many" />
  </div>
</template>

<script>
export default {
  name: "TopTool",
  props: ["title"],
  methods: {
    many() {},
  },
};
</script>

<style>
</style>