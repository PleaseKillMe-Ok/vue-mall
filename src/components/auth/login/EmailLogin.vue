<template>
  <div id="EmailLogin">
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
            name="邮箱"
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
            v-model="email"
            name="用户名"
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
                切换手机
              </van-button>
            </template>
          </van-field>
        </div>
        <van-field
          v-model="password"
          name="密码"
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
import { sendRegister } from "@/api/code";
import {
  emailValidator,
  passwordValidator,
  usernameValidator,
} from "@/validators";

export default {
  name: "EmailLogin",
  components: { TopTool },
  data() {
    return {
      title: "邮箱/用户名登录",
      isEmail: true, // 默认为邮箱登录
      validateFirst: true, // 第一次验证失效就结束验证
      email: "",
      way: "email",
      password: "",
      username: "",
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
      console.log(values);
      // 发送请求
      this.$toast.success("登录成功");
    },
    // 进入忘记密码
    toForgetPassword() {
      this.$router.push("/forget-password");
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
  },
};
</script>

<style>
</style>