<template>
  <div id="EmailFirst">
    <van-form @submit="next">
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
      />
      <van-field
        v-model="code"
        name="验证码"
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
      <van-button
        block
        round
        color="linear-gradient(to right, #ff6034, #ee0a24)"
        size="large"
        class="next-btn"
        native-type="submit"
        >下一步</van-button
      >
    </van-form>
  </div>
</template>

<script>
import { emailValidator, codeValidator } from "@/validators";
export default {
  name: "EmailFirst",
  data() {
    return {
      email: "",
      code: "",
      way: this.$route.query.way,
    };
  },
  methods: {
    emailValidator(value) {
      return emailValidator(value);
    },
    codeValidator(value) {
      return codeValidator(value);
    },
    // 发送验证码
    sendCode() {
      if (this.email !== "") this.$toast.success("模拟发送验证码");
      else this.$toast.fail("邮箱未填或格式错误");
    },
    // 进入下一步
    next() {
      let that = this
      // TODO:发送请求,请求成功回调emit,否则提示错误
      this.$toast.loading({
        message: "拼命加载中...",
        forbidClick: true,
        duration: 1000,
        onClose: function () {
          that.$emit("stepSuccess", 0); // 第一步执行成功
        },
      });
    },
  },
};
</script>

<style scoped>
#EmailFirst {
  margin: 20px;
}

/* 居中布局 */
.next-btn {
  margin-top: 30px;
  width: 60%;
  display: inline-block;
}
</style>