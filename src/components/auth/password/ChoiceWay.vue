<template>
  <div id="ChoiceWay">
    <van-dialog
      v-model="proxyShow"
      :show-confirm-button="showConfirm"
      show-cancel-button
      @cancel="cancel"
    >
      <van-cell
        title="手机找回"
        label="需要已绑定手机号"
        @click="goToPhoneFind"
      >
      </van-cell>
      <van-cell title="邮箱找回" label="需要已绑定邮箱" @click="goToEmailFind">
      </van-cell>
      <van-cell
        title="密保找回"
        label="需要已设定密保"
        @click="goToProtectionFind"
      >
      </van-cell>
    </van-dialog>
  </div>
</template>

<script>
export default {
  name: "ChoiceWay",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      proxyShow: false,
      showConfirm: false,
    };
  },
  watch: {
    show() {
      this.proxyShow = this.show;
    },
  },
  methods: {
    // 隐藏弹框
    cancel() {
      this.$emit("hideChoiceWay");
    },
    // 手机方式找回
    goToPhoneFind() {
      this.$router.push({ path: "/forget-password", query: { way: "phone" } });
    },
    // 邮箱方式找回
    goToEmailFind() {
      this.$router.push({ path: "/forget-password", query: { way: "email" } });
    },
    // 密保方式找回
    goToProtectionFind() {
      this.$router.push({
        path: "/forget-password",
        query: { way: "protection" },
      });
    },
  },
};
</script>

<style>
</style>