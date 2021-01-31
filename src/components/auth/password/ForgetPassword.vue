<template>
  <div id="ForgetPassword">
    <TopTool :title="title" :actionList="actionList"></TopTool>
    <div class="steps-style">
      <van-steps :active="active" class="step">
        <van-step v-for="(item, index) in stepList" :key="index">
          <span class="step-title">{{ item.title }}</span>
        </van-step>
      </van-steps>
    </div>
    <!-- 当到达某一步时,前一步骤成功时进入-->
    <div v-if="active === 0">
      <FindPasswordFirst @stepSuccess="stepSuccess"></FindPasswordFirst>
    </div>
    <div v-else-if="active === 1 && stepList[active - 1]">
      <FindPasswordSecond @stepSuccess="stepSuccess"></FindPasswordSecond>
    </div>
    <div v-else-if="active === 2 && stepList[active - 1]">
      <FindPasswordThird></FindPasswordThird>
    </div>
  </div>
</template>

<script>
const TopTool = () => import("@/components/auth/TopTool");
const FindPasswordFirst = () =>
  import("@/components/auth/password/FindPasswordFirst");
const FindPasswordSecond = () =>
  import("@/components/auth/password/FindPasswordSecond");
const FindPasswordThird = () =>
  import("@/components/auth/password/FindPasswordThird");
export default {
  name: "ForgetPassword",
  components: {
    TopTool,
    FindPasswordFirst,
    FindPasswordSecond,
    FindPasswordThird,
  },
  data() {
    return {
      stepStatus: [],
      actionList: [],
      title: "找回密码",
      active: 0,
      stepLen: 3,
      allowWay: ["phone", "email", "protection"],
      stepList: [
        {
          title: "验证用户",
        },
        {
          title: "重置密码",
        },
        {
          title: "成功",
        },
      ],
    };
  },
  created() {
    console.log(this.$route.query.way);
    this.redirect404();
    this.stepStatus = [false, false, false]; // 初始化步骤状态
  },
  methods: {
    // 参数不正确,跳转404界面
    redirect404() {
      if (!this.allowWay.includes(this.$route.query.way)) {
        this.$router.push("/404");
      }
    },
    // 每一步成功后回调的函数
    stepSuccess(active) {
      this.stepStatus[active] = true;
      this.active++;
    },
  },
};
</script>

<style scoped>
.step {
  text-align: left !important;
}
/* 步骤条字体 */
.step-title {
  font-size: 0.9rem;
}

</style>>