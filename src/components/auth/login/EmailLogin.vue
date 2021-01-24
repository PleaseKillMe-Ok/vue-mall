<template>
  <div id="EmailLogin">
    <!-- 验证第一次不通过不往后验证 -->
    <van-form @submit="login" :validate-first="validateFirst">
      <van-field
        v-model="email"
        name="邮箱"
        label="邮箱"
        placeholder="请输入邮箱号"
        :rules="[
          {
            required: true,
            message: '请填写邮箱',
          },
          {
            validator: emailValidator,
            message: '请输入正确的邮箱',
          },
        ]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        :rule="[{ required: true, message: '请填写密码' }]"
      />
    </van-form>
  </div>
</template>

<script>
export default {
  name: "EmailLogin",
  data() {
    return {
      validateFirst: true,
      email: "",
      emailPattern: /^([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+.[a-zA-Z]{2,3}$/,
      code: "",
      way: "",
      password: "",
      username: "",
    };
  },
  methods: {
    login(values) {},
    emailValidator(value) {
      // 异步调用
      this.$toast.loading("验证中...");
      if (!this.emailPattern.test(value)) {
        this.$toast.clear();
        return false;
      }
      return true;
    },
  },
};
</script>

<style>
</style>