<template>
  <div id="OpenStore">
    <h2 style="padding-top: 20px; color: purple">小云商城</h2>
    <div class="title">
      <van-icon name="gem-o" color="#aabcf3" />开启你的尊贵店铺
    </div>
    <div class="sub-title">快速上手，你值得拥有！</div>

    <van-form @submit="onOpenStore">
      <van-cell title="店铺类型" value="个人店" class="store-type" />
      <van-field
        v-model="name"
        name="name"
        label="店铺名"
        placeholder="请输入店铺名"
        :rules="[{ required: true, message: '请输入店铺名' }]"
      />
      <van-field
        v-model="intro"
        type="textarea"
        row="3"
        name="intro"
        autosize
        label="店铺介绍"
        placeholder="请输入店铺介绍（包括出售哪方面的商品)"
        show-word-limit
        maxlength="100"
        :rules="[{ required: true, message: '请输入店铺介绍' }]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >开店</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { openStore } from "@/api/user";
export default {
  name: "OpenStore",
  data() {
    return {
      name: "", // 店铺名
      intro: "", // 店铺介绍
    };
  },
  methods: {
    // 发起开店请求
    onOpenStore(values) {
      console.log(values);
      openStore(values)
        .then((res) => {
          let data = res.data;
          if (data.code === 1048) this.$toast.success("开店成功");
          this.$router.push({ name: "Setting" });
        })
        .catch((err) => {
          this.$toast.fail("开店失败,服务器开了会小差儿～");
        });
    },
  },
};
</script>

<style scoped>
/* 主标题 */
.title {
  padding-top: 50px;
  color: #d4d82c;
  font-weight: bolder;
  text-align: center;
}

/* 子标题 */
.sub-title {
  margin-top: 10px;
  margin-bottom: 50px;
  text-align: center;
  font-size: 16px;
  color: grey;
  opacity: 0.8;
}

.van-field {
  font-size: 18px;
  padding-top: 20px;
  margin-top: 1px;
}

/* 店铺类型 */
.store-type {
  font-size: 18px;
  text-align: left;
}
</style>