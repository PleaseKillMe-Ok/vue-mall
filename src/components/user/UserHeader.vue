<template>
  <div id="UserHeader">
    <!-- 最顶部工具栏 -->
    <TopTool :previousPage="previousPage"></TopTool>
    <!-- 简要个人信息栏 -->
    <van-cell is-link center>
      <van-row @click="toPersonal">
        <van-col span="8">
          <van-image
            class="head-image"
            width="5rem"
            height="5rem"
            fit="cover"
            src="https://img.yzcdn.cn/vant/cat.jpeg"
            round
        /></van-col>
        <van-col span="14">
          <span class="username block">{{ information.username }}</span>
          <span class="personality block">点这里可以添加个性签名</span>
          <div class="fans-attention block">
            <span>{{ information.fans }}</span
            ><span class="extra-text">关注</span> &nbsp;&nbsp;&nbsp;<span
              class="extra-text"
              >|</span
            >&nbsp;&nbsp;&nbsp; <span>{{ information.attention }}</span
            ><span class="extra-text">粉丝</span>
          </div>
        </van-col>
      </van-row>
    </van-cell>

    <!-- 功能宫格栏 -->
    <FunctionGrid></FunctionGrid>
  </div>
</template>

<script>
const TopTool = () => import("@/components/user/TopTool");
const FunctionGrid = () => import("@/components/user/FunctionGrid");
import { getInformation } from "@/api/user";
export default {
  name: "UserHeader",
  components: {
    TopTool,
    FunctionGrid,
  },
  data() {
    return {
      previousPage: "/",
      information: {}, // 用户个人信息
    };
  },
  created() {
    this.getInformation();
  },
  methods: {
    // 获取用户个人基本信息
    getInformation() {
      getInformation()
        .then((res) => {
          this.information = res.data;
        })
        .catch((res) => {
          this.$toast.fail("获取用户个人信息失败,服务器开了会小差～");
        });
    },
    toPersonal() {
      this.$router.push("/personal");
    },
  },
};
</script>

<style>
/* 头像 */
.head-image {
  text-align: left;
  float: left;
  margin: 10px 0px 0px 20px;
}
.username {
  margin-top: 1rem;
  margin-left: 20px;
  margin-right: 15px;
  font-size: 18px;
  font-weight: bolder;
}
.block {
  display: block;
}

/* 帐号 */
.personality {
  font-size: 0.8rem;
  margin-left: 1rem;
  color: grey;
  opacity: 0.8;
}

/* 关注度 */
.fans-attention {
  font-weight: bolder;
  margin-left: 1rem;
}

.extra-text {
  color: grey;
  opacity: 0.8;
  font-weight: 100;
  margin-left: 5px;
}
</style>