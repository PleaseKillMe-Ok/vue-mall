<template>
  <div id="FindPasswordSecond">
    <div v-if="$route.query.way === 'phone'">
      <PhoneSecond @stepSuccess="stepSuccess"></PhoneSecond>
    </div>
    <div v-else-if="$route.query.way === 'email'">
      <EmailSecond @stepSuccess="stepSuccess"></EmailSecond>
    </div>
    <div v-else-if="$route.query.way === 'protection'">
      <ProtectionSecond></ProtectionSecond>
    </div>
  </div>
</template>

<script>
const PhoneSecond = () =>
  import("@/components/auth/password/find-second/PhoneSecond");
const EmailSecond = () =>
  import("@/components/auth/password/find-second/EmailSecond");
const ProtectionSecond = () =>
  import("@/components/auth/password/find-second/ProtectionSecond");
export default {
  name: "FindPasswordSecond",
  components: { PhoneSecond, EmailSecond, ProtectionSecond },
  methods: {
    next() {},
    stepSuccess(active) {
      this.$emit("stepSuccess", active); // 通知父组件第二步执行成功
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