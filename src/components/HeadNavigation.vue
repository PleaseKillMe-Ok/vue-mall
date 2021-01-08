<template>
  <div class="HeadNavigation">
      <van-nav-bar
        title="标题"
        left-text="返回"
        right-text="按钮"
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
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  margin: 0 auto;
  padding: 0 auto;
}
</style>
