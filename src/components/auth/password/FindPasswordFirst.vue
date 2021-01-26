<template>
  <div id="FindPasswordFirst">
    <div v-if="$route.query.way === 'phone'">
      <PhoneFirst @stepSuccess="stepSuccess"></PhoneFirst>
    </div>
    <div v-else-if="$route.query.way === 'email'">
      <EmailFirst @stepSuccess="stepSuccess"></EmailFirst>
    </div>
    <div v-else-if="$route.query.way === 'protection'">
      <ProtectionFirst></ProtectionFirst>
    </div>
  </div>
</template>

<script>
const PhoneFirst = () =>
  import("@/components/auth/password/find-first/PhoneFirst");
const EmailFirst = () =>
  import("@/components/auth/password/find-first/EmailFirst");
const ProtectionFirst = () =>
  import("@/components/auth/password/find-first/ProtectionFirst");
export default {
  name: "FindPasswordFirst",
  components: {
    PhoneFirst,
    EmailFirst,
    ProtectionFirst,
  },
  props: {},
  methods: {
    stepSuccess(active) {
      console.log(222)
      this.$emit("stepSuccess", active); // 第一步执行成功
    },
  },
};
</script>

<style scoped>
</style>