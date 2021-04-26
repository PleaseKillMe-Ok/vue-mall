<template>
  <div id="UserSafe">
    <TopTool
      :title="title"
      :hasRight="false"
      :previousPage="previousPage"
    ></TopTool>
    <van-cell>
      <template #title>
        <span class="title">会员名</span>
      </template>
      <template #default>
        <span class="right">{{ username }}</span>
      </template>
    </van-cell>
    <van-cell is-link @click="bindPhone">
      <template #title>
        <span class="title">修改手机号码</span>
      </template>
      <template #default>
        <span class="right">{{ phone }}</span>
      </template>
    </van-cell>
    <van-cell is-link>
      <template #title>
        <span class="title">修改登录密码</span>
      </template>
    </van-cell>
    <van-cell is-link @click="discard">
      <template #title>
        <span class="title">注销账户</span>
      </template>
    </van-cell>
    <br />
    <van-cell is-link>
      <template #title>
        <span class="title">账户保护</span>
      </template>
    </van-cell>
    <br />
    <van-cell is-link>
      <template #title>
        <span class="title">实名认证</span>
      </template>
      <template #default>
        <span class="right">{{ full_name }}</span>
      </template>
    </van-cell>
  </div>
</template>

<script>
const TopTool = () => import("@/components/user/TopTool");
import { discard } from "@/api/user";
export default {
  name: "UserSafe",
  components: { TopTool },
  data() {
    return {
      phone: "",
      username: "",
      full_name: "",
      title: "账户安全",
      previousPage: "Setting",
    };
  },
  created() {
    // 发送请求获取个人信息
    this.phone = "13787833290";
    this.username = "syz999520";
    this.full_name = "司云中";
  },
  methods: {
    bindPhone() {
      sessionStorage.setItem("tempPhone", this.phone); // 临时保存phone
      this.$router.push({ name: "BindPhone" });
    },

    // 注销账户
    discard() {
      this.$dialog
        .confirm({
          title: "注销账户！",
          message: "您确定忍心要注销您的账户吗？",
        })
        .then(() => {
          discard()
            .then((res) => {
              let data = res.data;
              if (data.code === 1071) {
                this.$toast.success("注销账户成功");
                this.$router.push({ name: "PhoneLogin" });
              }
            })
            .catch((res) => {
              this.$toast.fail("注销账户失败");
            });
        })
        .catch(() => {
          // on cancel
        });
    },
  },
};
</script>

<style scoped>
.title {
  float: left;
  font-size: 0.8rem;
}
</style>