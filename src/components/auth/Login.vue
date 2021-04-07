<template>
  <div id="Login">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {};
  },
};
</script>

<style scoped>
.form {
  padding-top: 30px;
}
/* 单元项样式 */
.van-cell {
  font-size: 20px !important;
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

/* 输入框字体 */
.van-field__control {
  font-size: 16px !important;
}
</style>