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
      <FindPasswordFirst></FindPasswordFirst>
    </div>
    <div v-else-if="active === 1 && stepList[active - 1]">
      <FindPasswordSecond></FindPasswordSecond>
    </div>
    <div v-else-if="active === 2 && stepList[active - 1]">
      <FindPasswordThird></FindPasswordThird>
    </div>
    <button @click="next">下一步</button>
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
      stepList: [
        {
          title: "第一步",
        },
        {
          title: "第二步",
        },
        {
          title: "第三步",
        },
      ],
    };
  },
  created() {
    this.stepStatus = [false, false, false]; // 初始化步骤状态
  },
  methods: {
    next() {
      // TODO:发送请求,请求成功设定this.stepStatus[this.active] = true,否则提示错误

      this.stepStatus[this.active] = true;
      if (this.stepStatus[this.active]) {
        this.active = (this.active + 1) % this.stepLen;
      }
    },
  },
};
</script>

<style scoped>
.step {
  text-align: left !important;
}

.step-title {
  font-size: 0.9rem;
}
</style>>