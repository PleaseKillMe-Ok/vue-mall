<template>
  <div id="Index">
    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
      success-text="刷新成功"
      loading-text="拼命加载中.."
    >
      <router-view />
    </van-pull-refresh>
    <Footer></Footer>
  </div>
</template>

<script>
const Footer = () => import("@/components/common/Footer");
import { Toast } from "vant";
export default {
  name: "Index",
  components: { Footer },
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    // 下拉刷新
    onRefresh() {
      this.$router.push(this.$route.path);
      setTimeout(() => {
        this.isLoading = false;
      }, 1500);
    },
  },
};
</script>

<style>
</style>