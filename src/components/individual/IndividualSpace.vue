<template>
  <div id="Information">
    <IndividualHeader></IndividualHeader>
    <!-- <FunctionGrid></FunctionGrid> -->
  </div>
</template>

<script>
import FunctionGrid from "./FunctionGrid";
import IndividualHeader from "./IndividualHeader";
export default {
  name: "Information",
  components: { FunctionGrid, IndividualHeader },
  data() {
    return {};
  },
};
</script>


<style>
</style>