<template>
  <div id="UserSafe">
    <TopTool :title="title" :hasRight="false"></TopTool>
  </div>
</template>

<script>
const TopTool = () => import("@/components/user/TopTool");
export default {
  name: "UserSafe",
  components: { TopTool },
  data() {
    return {
      title: "账户安全",
    };
  },
};
</script>

<style>
</style>