<template>
  <!-- 用户设置 -->
  <div id="UserSettings">
    <TopTool :title="title" :hasRight="false"></TopTool>
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
    <van-cell is-link :to="{ name: 'Address' }">
      <template #title>
        <span class="title">地址管理</span>
      </template>
    </van-cell>
    <br />
    <van-cell is-link :to="{name:'Safe'}">
      <template #title>
        <span class="title">账户与安全</span>
      </template>
    </van-cell>
    <br />
    <van-cell is-link>
      <template #title>
        <span class="title">支付设置</span>
      </template>
    </van-cell>
    <br />
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
    <br />
    <van-cell is-link>
      <template #title>
        <span class="title blank">切换用户</span>
      </template>
    </van-cell>
    <br />
    <van-cell is-link center>
      <template #title>
        <span class="title blank">退出登录</span>
      </template>
    </van-cell>
  </div>
</template>

<script>
const TopTool = () => import("@/components/user/TopTool");
export default {
  name: "UserSettings",
  components: { TopTool },
  data() {
    return {
      title: "账户设置",
    };
  },
};
</script>

<style scoped>
#UserSettings {
  background-color: #f7f8fa;
}
.title {
  float: left;
  font-size: 0.9rem;
  margin-top: 6px;
}

.blank {
  font-size: 0.9rem;
  float: inherit;
}
</style>