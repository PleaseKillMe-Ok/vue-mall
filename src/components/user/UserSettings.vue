<template>
  <!-- 用户设置 -->
  <div id="UserSettings">
    <TopTool :title="账户设置" :hasRight="false"></TopTool>
    <van-cell-group>
      <van-cell is-link>
        <template #title>
          <span class="title"
            ><van-image
              round
              width="5rem"
              height="5rem"
              src="https://img01.yzcdn.cn/vant/cat.jpeg"
          /></span>
        </template>
      </van-cell>
      <van-cell is-link>
        <template #title>
          <span class="title">地址管理</span>
        </template>
      </van-cell>
      <van-cell is-link>
        <template #title>
          <span class="title">我的账户管理</span>
        </template>
      </van-cell>
      <van-cell is-link>
        <template #title>
          <span class="title">支付设置</span>
        </template>
      </van-cell>
      <van-cell is-link>
        <template #title>
          <span class="title">地区设置</span>
        </template>
      </van-cell>
      <van-cell is-link>
        <template #title>
          <span class="title">问题反馈</span>
        </template>
      </van-cell>
      <van-cell is-link>
        <template #title>
          <span class="title">关于吃货商城</span>
        </template>
      </van-cell>
      <van-cell is-link>
        <template #title>
          <span class="title">切换用户</span>
        </template>
      </van-cell>
      <van-cell is-link>
        <template #title>
          <span class="title">退出登录</span>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
const TopTool = () => import("@/components/user/TopTool");
export default {
  name: "UserSettings",
  components: { TopTool },
};
</script>

<style scoped>
.title {
  float: left;
  font-size: 0.9rem;
}
</style>