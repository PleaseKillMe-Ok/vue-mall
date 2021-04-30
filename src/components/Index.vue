<template>
  <div id="Index">
    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
      success-text="刷新成功"
      loading-text="拼命加载中.."
    >
      <router-view v-if="isRouterAlive"></router-view>
    </van-pull-refresh>
    <Footer></Footer>
  </div>
</template>

<script>
const Footer = () => import("@/components/common/Footer");
export default {
  name: "Index",
  components: { Footer },
  provide() {
    // 父组件提供属性，以便子组件inject注入
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isLoading: false,
      isRouterAlive: true,
    };
  },
  methods: {
    // 下拉刷新

    onRefresh() {
      let sendTime = new Date().getMilliseconds();
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true; // 使用v-if来重新渲染子组件
        let endTime = new Date().getMilliseconds();
        setTimeout(() => {
          this.isLoading = false;
        }, sendTime - endTime);
      });
    },

    reload() {
      this.isRouterAlive = false;
      // 等待dom元素更新后调用
      this.$nextTick(function () {
        this.isRouterAlive = true; // 使用v-if来重新渲染子组件
      });
    },
  },
};
</script>

<style scoped>
#Index{
  height: 500px;
}
</style>