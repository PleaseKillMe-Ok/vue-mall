<template>
  <div id="PhoneLogin">
    <ChoiceWay :show="showChoice" @hideChoiceWay="hideChoiceWay"></ChoiceWay>
    <TopTool :title="title" :actionList="actionList"></TopTool>
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
          name="phone"
          label="手机号"
          placeholder="请输入手机号"
          maxlength="11"
          clearable
          center
          :rules="[
            {
              required: true,
              message: '请输入手机号',
            },
            {
              validator: phoneValidator,
              message: '请输入正确格式的手机号',
            },
          ]"
        />
        <van-field
          v-model="code"
          name="code"
          label="验证码"
          placeholder="验证码"
          clearable
          maxlength="6"
          center
          :rules="[
            {
              required: true,
              message: '请输入验证码',
            },
            {
              validator: codeValidator,
              message: '请输入正确位数的验证码',
            },
          ]"
        >
          <!-- 插槽:插入发送验证码按钮 -->
          <template #button>
            <van-button
              size="small"
              type="info"
              native-type="button"
              @click="sendCode"
              >发送验证码</van-button
            >
          </template>
        </van-field>
        <div class="submitButton">
          <van-button round block type="warning" native-type="submit"
            ><span style="font-size: 20px">登录</span></van-button
          >
        </div>
        <van-row class="utils">
          <van-col span="12" @click="toForgetPassword">忘记密码 </van-col>
          <van-col span="12" @click="displayOtherWay">其他登录 </van-col>
        </van-row>
        <van-row class="otherWay" v-if="showOther">
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
const ChoiceWay = () => import("@/components/auth/password/ChoiceWay");
import { phoneValidator, codeValidator } from "@/validators";
import { sendRegister } from "@/api/code";
import { login } from "@/api/user.js";
export default {
  name: "PhoneLogin",
  components: { TopTool, ChoiceWay },
  data() {
    return {
      title: "手机登录",
      phone: "",
      code: "",
      way: "phone",
      password: "",
      showOther: false, // 显示其他登录方式
      showChoice: false, // 显示忘记密码弹出框
      isRemember: false, // 默认不记住用户名
      otherWayList: [
        {
          way: "QQ登录",
          to: "/login/qq",
        },
        {
          way: "微博登录",
          to: "/login/wb",
        },
        {
          way: "微信登录",
          to: "/login/wx",
        },
      ],
      actionList: [
        {
          name: "邮箱/用户名登录",
          to: "/login/email",
        },
        {
          name: "手机注册",
          to: "/register/phone",
        },
        {
          name: "邮箱注册",
          to: "/register/email",
        },
        {
          name: "帮助",
          to: "/help",
        },
      ],
    };
  },
  methods: {
    // 登录
    login(values) {
      // 请求数据体
      let loadToast = this.$toast.loading({
        message: "请求中...",
        forbidClick: true,
      });
      let postData = {
        login_key: values.phone,
        is_remember: this.isRemember,
        way: "phone",
        code: values.code,
      };
      login(postData)
        .then((res) => {
          let data = res.data;
          if (data.detail) {
            this.$toast.fail(data.detail);
          } else {
            sessionStorage.setItem("Bearer-Token", data.token);
            loadToast.clear(); // 关闭加载框
            this.$router.push(this.$route.query.redirect); // 加载先前页
          }
        })
        .catch((err) => {
          loadToast.clear(); // 关闭加载框
          this.$toast.fail("服务器开开了会小差~");
        });
    },
    // 进入忘记密码
    toForgetPassword() {
      // this.$router.push("/forget-password");
      this.showChoice = true;
    },
    // 显示其他登录方式
    displayOtherWay() {
      this.showOther = !this.showOther;
    },
    // 进入其他方式
    toOtherWay(index) {
      if (index == 0) {
        this.$router.push("/login/qq");
      } else if (index == 1) {
        this.$router.push("/login/wb");
      } else if (index == 2) {
        this.$router.push("/login/wx");
      }
    },
    // 校验
    phoneValidator(value) {
      return phoneValidator(value);
    },
    codeValidator(value) {
      return codeValidator(value);
    },
    // 发送验证码
    sendCode() {
      if (this.phone != "" && phoneValidator(this.phone)) {
        // TODO: 倒计时60s
        let data = {
          phone: this.phone,
          way: this.way,
        };
        sendRegister(data)
          .then((res) => {
            let data = res.data;
            if (data.code === 7 && data.status === "error")
              this.$toast.fail(data.msg);
            else if (data.code === 41 && data.status === "success")
              this.$toast.success(data.msg);
          })
          .catch((err) => {
            this.$toast.fail("服务器开开了会小差~");
          });
      } else {
        this.$toast.fail("请检查手机号格式是否正确");
      }
    },
    // 隐藏找回密码弹框
    hideChoiceWay() {
      this.showChoice = false;
    },
  },
};
</script>

<style>
</style>