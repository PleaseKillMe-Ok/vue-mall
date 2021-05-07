<template>
  <!-- 个人空间 -->
  <div id="UserSpace">
    <!-- 头部组件 -->
    <UserHeader></UserHeader>
  </div>
</template>

<script>
const UserHeader = () => import("@/components/user/UserHeader");

export default {
  name: "UserSpace",
  components: { UserHeader },
  data() {
    return {};
  },
};
</script>


<style scoped>
</style>