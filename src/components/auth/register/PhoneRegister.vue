<template>
  <div id="Register">
    <TopTool :title="title" :actionList="actionList"></TopTool>
    <van-form @submit="register">
      <van-field
        v-model="phone"
        name="phone"
        label="手机号"
        placeholder="请输入手机号"
        clearable
        center
        :rules="[
          {
            required: true,
            message: '请输入手机号',
          },
          {
            validator: phoneValidator,
            message: '请输入正确的手机号格式',
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
import { phoneValidator, codeValidator, passwordValidator } from "@/validators";
import { sendRegister } from "@/api/code";
import { register } from "@/api/user";
export default {
  name: "Register",
  data() {
    return {
      way: "phone", // 注册方式
      phone: "",
      code: "",
      password: "",
      title: "手机号注册",
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
  components: {
    TopTool,
  },
  methods: {
    // 注册
    register(values) {
      values["way"] = "phone";
      let load = this.$toast.loading({
        message: "拼命加载中...",
        forbidClick: true,
      });
      register(values)
        .then((res) => {
          load.clear(); // 关闭加载框
          let data = res.data; // 数据
          if (data.detail) this.$toast.fail(data.detail); // 校验错误
          if (res.data.code === 21) {
            this.$toast.success("注册成功");
            this.$router.push({ name: "LoginPhone" });
          }
        })
        .catch((err) => {
          load.clear();
          this.$toast.fail("服务器开了会儿小差~");
        });
    },
    // 校验
    phoneValidator(value) {
      return phoneValidator(value);
    },
    codeValidator(value) {
      return codeValidator(value);
    },
    // 校验密码
    passwordValidator(value) {
      return passwordValidator(value);
    },
    // 发送验证码
    sendCode() {
      if (this.phone != "" && phoneValidator(this.phone)) {
        // TODO: 倒计时60s
        let data = { phone: this.phone, way: "phone" };
        sendRegister(data)
          .then((res) => {
            if (res.data.code === 41) this.$toast.success("验证码发送成功");
          })
          .catch((err) => {
            this.$toast.fail("服务器开了会儿小差~");
          });
      } else {
        this.$toast.fail("请检查手机号格式是否正确");
      }
    },
  },
};
</script>

<style>
</style>