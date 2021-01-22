<template>
  <div id="Index">
            <!-- 头部导航栏 -->
      <!-- <router-view name="header"></router-view> -->
      <!-- 标签 -->

      <!-- <router-view name="select"></router-view> -->
      <!-- 轮播图 -->
      <!-- <router-view name="swipe"></router-view> -->

      <!-- 主要内容 -->
      <!-- <Car></Car> -->
      <router-view />
      <!-- <TestAxios></TestAxios> -->

      <!-- 尾部标签 -->
      <Footer @head_info="set_head_info"></Footer>
  </div>
</template>

<script>
const Footer =() => import('@/components/common/Footer')
export default {
    name:'Index',
    components:{Footer}
}
</script>

<style>

</style>