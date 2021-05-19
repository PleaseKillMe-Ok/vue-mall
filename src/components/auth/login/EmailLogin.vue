<template>
  <div id="EmailLogin">
    <ChoiceWay :show="showChoice" @hideChoiceWay="hideChoiceWay"></ChoiceWay>
    <TopTool :title="title" :actionList="actionList"></TopTool>
    <!-- 验证第一次不通过不往后验证 -->
    <div class="card">
      <van-image
        round
        width="6rem"
        height="6rem"
        src="https://img.yzcdn.cn/vant/cat.jpeg"
      />

      <van-form @submit="login" class="form">
        <div v-if="isEmail">
          <van-field
            v-model="email"
            name="email"
            label="邮箱"
            placeholder="请输入邮箱"
            clearable
            center
            :rules="[
              {
                required: true,
                message: '请输入邮箱号',
              },
              {
                validator: emailValidator,
                message: '请输入正确格式的邮箱',
              },
            ]"
          >
            <template #button>
              <van-button
                icon="https://img.yzcdn.cn/vant/user-active.png"
                type="info"
                native-type="button"
                size="middle"
                plain
                color="linear-gradient(to right, #ff6034, #ee0a24)"
                @click="translateWay"
              >
                切换用户名
              </van-button>
            </template>
          </van-field>
        </div>
        <div v-else>
          <van-field
            v-model="username"
            name="username"
            label="用户名"
            placeholder="请输入用户名"
            clearable
            center
            :rules="[
              {
                required: true,
                message: '请输入用户名',
              },
              {
                validator: usernameValidator,
                message: '请输入正确格式的用户名',
              },
            ]"
          >
            <template #button>
              <van-button
                icon="https://img.yzcdn.cn/vant/user-active.png"
                type="info"
                native-type="button"
                size="middle"
                plain
                color="linear-gradient(to right, #ff6034, #ee0a24)"
                @click="translateWay"
              >
                切换邮箱
              </van-button>
            </template>
          </van-field>
        </div>
        <van-field
          v-model="password"
          name="password"
          label="密码"
          type="password"
          maxlength="20"
          placeholder="请输入密码"
          clearable
          center
          :rules="[
            {
              required: true,
              message: '请输入密码',
            },
            {
              validator: passwordValidator,
              message: '密码格式不允许非法字符,长度在8~20位之间',
            },
          ]"
        />
        <div class="submitButton">
          <van-button round block type="warning" native-type="submit"
            ><span style="font-size: 20px">登录</span></van-button
          >
        </div>
        <van-row class="utils">
          <van-col span="12" @click="toForgetPassword"> 忘记密码 </van-col>
          <van-col span="12" @click="displayOtherWay"> 其他登录 </van-col>
        </van-row>
        <van-row class="otherWay" v-if="show">
          <van-col
            span="8"
            v-for="(item, index) in otherWayList"
            :key="index"
            @click="toOtherWay(index)"
          >
            {{ item.way }}</van-col
          >
        </van-row>
      </van-form>
    </div>
  </div>
</template>

<script>
const ChoiceWay = () => import("@/components/auth/password/ChoiceWay");
const TopTool = () => import("@/components/auth/TopTool");
import { login } from "@/api/user.js";
import {
  emailValidator,
  passwordValidator,
  usernameValidator,
} from "@/validators";

export default {
  name: "EmailLogin",
  components: { TopTool, ChoiceWay },
  data() {
    return {
      title: "邮箱/用户名登录",
      isEmail: true, // 默认为邮箱登录
      validateFirst: true, // 第一次验证失效就结束验证
      email: "",
      way: "email",
      isRemember: true, // 记住用户名/邮箱
      password: "",
      username: "",
      showChoice: false, // 显示忘记密码弹出框
      show: false, // 是否显示其他登录方式
      actionList: [
        {
          name: "手机登录",
          to: "/login/phone",
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
    };
  },
  methods: {
    // 校验邮箱
    emailValidator(value) {
      return emailValidator(value);
    },
    // 校验密码
    passwordValidator(value) {
      return passwordValidator(value);
    },
    // 校验用户名
    usernameValidator(value) {
      return usernameValidator(value);
    },
    login(values) {
      // 请求数据体
      let loadToast = this.$toast.loading({
        message: "请求中...",
        forbidClick: true,
      });
      let login_key = this.isEmail ? values.email : values.username;
      let way = this.isEmail ? "email" : "username";
      let postData = {
        login_key: login_key,
        is_remember: this.isRemember,
        way: way,
        password: values.password,
      };
      login(postData)
        .then((res) => {
          let data = res.data;
          if (data.detail) {
            this.$toast.fail(data.detail);
          } else {
            sessionStorage.setItem("Bearer-Token", data.token);
            loadToast.clear(); // 关闭加载框
            if (this.$route.query.redirect) {
              this.$router.push(this.$route.query.redirect); // 加载先前页
            }
            this.$router.push("/"); // 加载先前页
          }
        })
        .catch((err) => {
          loadToast.clear(); // 关闭加载框
          this.$toast.fail("服务器开开了会小差~");
        });
    },
    // 进入忘记密码
    toForgetPassword() {
      this.showChoice = true;
    },
    // 显示其他登录方式
    displayOtherWay() {
      this.show = !this.show;
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
    // 切换为用户名登录
    translateWay() {
      this.isEmail = !this.isEmail;
      if (this.way == "email") this.way = "username";
      else this.way = "email";
    },
    // 隐藏找回密码弹框
    hideChoiceWay() {
      this.showChoice = false;
    },
  },
};
</script>

<style scoped>
.van-cell {
  font-size: 18px !important;
}
.van-button {
  margin-top: 25px;
  margin-bottom: 25px;
}
.utils {
  margin: 25px;
}
</style>