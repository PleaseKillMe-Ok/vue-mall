<template>
  <div id="IndividualSpace">
    <!-- 头部导航栏 -->
    <IndividualHeader></IndividualHeader>
    
  </div>
</template>

<script>
import FunctionGrid from "./FunctionGrid";
import IndividualHeader from "./IndividualHeader";
export default {
  name: "IndividualSpace",
  components: { FunctionGrid, IndividualHeader },
  data() {
    return {};
  },
};
</script>


<style scoped>

</style>