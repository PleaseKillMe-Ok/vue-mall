<template>
  <!-- 个人空间 -->
  <div id="IndividualSpace">
    <!-- 头部组件 -->
    <IndividualHeader></IndividualHeader>
    <!-- 订单组件 -->
    <OrderLine></OrderLine>
  </div>
</template>

<script>
const IndividualHeader = () =>
  import("@/components/individual/IndividualHeader");
const OrderLine = () => import("@/components/order/OrderLine");

export default {
  name: "IndividualSpace",
  components: { IndividualHeader, OrderLine },
  data() {
    return {};
  },
};
</script>


<style scoped>
</style>