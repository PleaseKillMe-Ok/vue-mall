<template>
  <div id="EmailSecond">
    <van-form @submit="modify">
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
      <van-field
        v-model="againPassword"
        type="password"
        name="againPassword"
        label="确认密码"
        maxlength="20"
        placeholder="确认密码"
        clearable
        center
        :rules="[
          { required: true, message: '请再次确认密码' },
          {
            validator: passwordValidator,
            message: '密码格式不允许非法字符,长度在8~20位之间',
          },
          {
            validator: sameAsFirst,
            message: '两次密码不一致',
          },
        ]"
      />
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
import { passwordValidator } from "@/validators";
export default {
  name: "EmailSecond",
  data() {
    return {
      password: "",
      againPassword: "",
    };
  },
  methods: {
    // 表单提交+二次确认
    modify() {
      let that = this;
      this.$dialog.confirm({
        title: "修改密码",
        message: "您确认修改密码吗?",
      })
      .then(()=>{
        that.executeModify(that)
      })
      .catch(()=>{
        // cancel
      })
      
    },
    // // TODO:发送请求,请求成功回调emit,否则提示错误
    executeModify(that) {
      this.$toast.loading({
        message: "拼命加载中...",
        forbidClick: true,
        duration: 1000,
        onClose: function () {
          that.$emit("stepSuccess", 1); // 第一步执行成功回调
        },
      });
    },
    passwordValidator(value) {
      return passwordValidator(value);
    },
    sameAsFirst(value) {
      return value == this.password;
    },
  },
};
</script>

<style scoped>
/* 居中布局 */
.next-btn {
  margin-top: 30px;
  width: 50%;
  display: inline-block;
}
</style>