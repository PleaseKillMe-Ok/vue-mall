<template>
  <div id="EmailRegister">
    <TopTool :title="title" :actionList="actionList"></TopTool>
    <van-form @submit="register">
      <van-field
        v-model="email"
        name="email"
        label="邮箱号"
        placeholder="请输入邮箱"
        clearable
        center
        :rules="[
          {
            required: true,
            message: '请输入邮箱',
          },
          {
            validator: emailValidator,
            message: '请输入正确格式的邮箱',
          },
        ]"
      />
      <van-field
        v-model="username"
        name="username"
        label="用户名"
        placeholder="请输入用户名"
        maxlength="20"
        clearable
        center
        :rules="[
          {
            required: true,
            message: '请输入用户名',
          },
          {
            validator: usernameValidator,
            message: '用户名不能包含非法字符,长度在1~20之间',
          },
        ]"
      />
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
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
const TopTool = () => import("@/components/auth/TopTool");
import { sendRegister } from "@/api/code";
import { register } from "@/api/user";
import {
  emailValidator,
  usernameValidator,
  passwordValidator,
  codeValidator,
} from "@/validators";
export default {
  name: "EmailRegister",
  components: {
    TopTool,
  },
  data() {
    return {
      title: "邮箱注册",
      way: "email",
      username: "",
      email: "",
      code: "",
      password: "",
      actionList: [
        {
          name: "手机登录",
          to: "/login/phone",
        },
        {
          name: "邮箱/用户名登录",
          to: "/login/email",
        },
        {
          name: "手机注册",
          to: "/register/phone",
        },
        {
          name: "帮助",
          to: "/help",
        },
      ],
    };
  },
  methods: {
    // 注册用户
    register(values) {
      values["way"] = this.way;
      register(values)
        .then((res) => {
          if (res.data.status === "success") this.$toast.success("注册成功");
          else if (res.data.detail) this.$toast.fail(res.data.detail);
        })
        .catch((err) => {
          this.$toast.fail("服务器开了会小差~");
        });
    },
    emailValidator(value) {
      return emailValidator(value);
    },
    usernameValidator(value) {
      return usernameValidator(value);
    },
    passwordValidator(value) {
      return passwordValidator(value);
    },
    codeValidator(value) {
      return codeValidator(value);
    },
    // 发送验证码
    sendCode() {
      if (this.email != "" && emailValidator(this.email)) {
        // TODO: 倒计时60s
        let data = {
          email: this.email,
          way: this.way,
        };
        sendRegister(data)
          .then((res) => {
            let data = res.data;
            this.$toast.fail(data.msg);
          })
          .catch((err) => {
            this.$toast.fail("服务器开开了会小差~");
          });
      } else {
        this.$toast.fail("请检查邮箱格式是否正确");
      }
    },
  },
};
</script>

<style>
</style>