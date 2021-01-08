<template>
  <div class="HeadNavigation">
      <van-nav-bar
        :title="title"
        :left-text="left_text"
        :right-text="right_text"
        left-arrow
        @click-left="onClickLeft"
      />
  </div>
</template>

<script>
export default {
  name: "HeadNavigation",
  data() {
    return {
      msg: "HeadNavigation",
    };
  },
  methods:{
    onClickLeft(){
      Toast('返回');
    }
  },
  props:['title', 'left_text', 'right_text']
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  margin: 0 auto;
  padding: 0 auto;
}
</style>
