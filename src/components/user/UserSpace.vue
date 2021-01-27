<template>
  <!-- 个人空间 -->
  <div id="UserSpace">
    <!-- 头部组件 -->
    <UserHeader></UserHeader>
    <!-- 订单组件 -->
    <OrderLine></OrderLine>
  </div>
</template>

<script>
const UserHeader = () =>
  import("@/components/user/UserHeader");
const OrderLine = () => import("@/components/order/OrderLine");

export default {
  name: "UserSpace",
  components: { UserHeader, OrderLine },
  data() {
    return {};
  },
};
</script>


<style scoped>
</style>