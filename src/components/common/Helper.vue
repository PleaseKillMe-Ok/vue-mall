<template>
  <div id="Helpder">
    <p :class="label">开发人员:</p>
    {{ author }}
    <p :class="label">应用架构:</p>
    <p>{{ framework }}</p>
    <p :class="label">个人博客:</p>
    <p><a :href="blog">云博</a></p>
    <p :class="label">Github地址:</p>
    <p><a :href="github">SmartCloud</a></p>
  </div>
</template>

<script>
export default {
  name: "Helpder",
  data() {
    return {
      label: "label",
      author: "司云中和他女票曾靖文",
      framework: "采用前后端分离Vue.js+Django进行开发",
      blog: "https://syzzjw.cn",
      github: "https://github.com/syz247179876",
    };
  },
};
</script>

<style>
.label {
  font-weight: bolder;
}
</style>