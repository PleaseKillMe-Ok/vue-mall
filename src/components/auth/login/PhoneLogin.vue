<template>
  <div id="PhoneLogin">
    <TopTool :title="title"></TopTool>
    <div class="card">
      <van-image
        round
        width="6rem"
        height="6rem"
        src="https://img.yzcdn.cn/vant/cat.jpeg"
      />

      <van-form @submit="login" class="form">
        <van-field
          v-model="phone"
          name="手机号"
          label="手机号"
          placeholder="请输入手机号"
        />
        <van-field
          v-model="code"
          name="验证码"
          label="验证码"
          placeholder="请输入验证码"
        />
        <div class="submitButton">
          <van-button round block type="warning" native-type="submit"
            ><span style="font-size:20px">登录</span></van-button
          >
        </div>
        <van-row class="utils">
          <van-col span="12" @click="toForgetPassword">忘记密码 </van-col>
          <van-col span="12" @click="displayOtherWay">其他登录 </van-col>
        </van-row>
        <van-row class="otherWay" v-if="show">
          <van-col
            span="8"
            v-for="(item, index) in otherWayList"
            :key="index"
            @click="toOtherWay(index)"
          >
            {{ item.way }}
          </van-col>
        </van-row>
      </van-form>
    </div>
  </div>
</template>

<script>
const TopTool = () => import("@/components/auth/TopTool");

export default {
  name: "PhoneLogin",
  components: { TopTool },
  data() {
    return {
      title: "用户注册",
      phone: "",
      code: "",
      way: "",
      password: "",
      show: false,
      otherWayList: [
        {
          way: "QQ登录",
          to: "",
        },
        {
          way: "微博登录",
          to: "",
        },
        {
          way: "微信登录",
          to: "",
        },
      ],
    };
  },
  methods: {
    login(values) {},
    // 进入忘记密码
    toForgetPassword() {},
    // 显示其他登录方式
    displayOtherWay() {
      this.show = !this.show;
    },
    // 进入其他方式
    toOtherWay(index) {
      if (index == 0) {
        this.$toast.success("QQ登录");
      } else if (index == 1) {
        this.$toast.success("微博登录");
      } else if (index == 2) {
        this.$toast.success("微信登录");
      }
    },
  },
};
</script>

<style scoped>
/* 登录表单样式 */
.form {
  padding-top: 30px;
}
/* 单元项样式 */
.van-cell {
  font-size: 20px;
  margin-top: 20px;
}
.submitButton {
  margin-top: 30px;
}
.utils {
  margin-top: 40px;
}
/* 其他登录方式 */
.otherWay {
  margin-top: 30px;
}
</style>