<template>
  <!-- 用户设置 -->
  <div id="UserSettings">
    <TopTool :title="title" :hasRight="false"></TopTool>
    <van-cell is-link center>
      <van-row>
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
          <span class="sex block">性别：{{ information.sex }}</span>
        </van-col>
      </van-row>
    </van-cell>
    <van-cell is-link :to="{ name: 'Address' }">
      <template #title>
        <span class="title">地址管理</span>
      </template>
    </van-cell>
    <br />
    <van-cell is-link :to="{ name: 'Safe' }">
      <template #title>
        <span class="title">账户与安全</span>
      </template>
    </van-cell>
    <van-cell is-link>
      <template #title>
        <span class="title">支付设置</span>
      </template>
    </van-cell>
    <br />
    <van-cell is-link>
      <template #title>
        <span class="title">地区设置</span>
      </template>
    </van-cell>
    <van-cell is-link>
      <template #title>
        <span class="title">问题反馈</span>
      </template>
    </van-cell>
    <van-cell is-link @click="helper">
      <template #title>
        <span class="title">关于吃货商城</span>
      </template>
    </van-cell>
    <van-cell is-link :to="{ name: 'OpenStore' }">
      <template #title>
        <span class="title">商家开店</span>
      </template>
    </van-cell>
    <br />
    <van-cell is-link center @click="transfer">
      <template #title>
        <span class="title blank">切换用户</span>
      </template>
    </van-cell>
    <br />
    <van-cell is-link center @click="logout">
      <template #title>
        <span class="title blank">退出登录</span>
      </template>
    </van-cell>
    <!-- 帮助文档 -->
    <van-dialog v-model="showHelper" title="帮助文档" show-cancel-button>
      <!-- 将子组件数据传出来 -->
      <Helper></Helper>
    </van-dialog>
  </div>
</template>

<script>
const TopTool = () => import("@/components/user/TopTool");
const Helper = () => import("@/components/common/Helper");
import { getInformation } from "@/api/user";
export default {
  name: "UserSettings",
  components: { TopTool, Helper },
  data() {
    return {
      title: "账户设置",
      showHelper: false,
      information: {},
    };
  },
  created() {
    this.getInformation();
  },
  methods: {
    // 获取用户个人信息
    getInformation() {
      getInformation()
        .then((res) => {
          this.information = res.data;
        })
        .catch((res) => {
          this.$toast.fail("获取用户个人信息失败,服务器开了会小差～");
        });
    },
    helper() {
      this.showHelper = true;
    },

    // 切换用户
    transfer() {
      sessionStorage.removeItem("Bearer-Token");
      this.$router.push({ name: "LoginPhone" });
    },

    // 登出
    logout() {
      sessionStorage.removeItem("Bearer-Token");
      // // 删除cookie中的Bearer-Token
      // var cookieArray = document.cookie; // 获取cookie存储字符串
      // console.log(cookieArray);
      this.$router.push({ name: "LoginPhone" });
    },
  },
};
</script>

<style scoped>
#UserSettings {
  background-color: #f7f8fa;
}
.title {
  float: left;
  font-size: 0.9rem;
  margin-top: 6px;
}

.blank {
  font-size: 0.9rem;
  float: inherit;
}

.username {
  padding-top: 25px;
  margin-left: 20px;
  margin-right: 15px;
  font-size: 18px;
  font-weight: bolder;
}

.sex {
  margin-left: 20px;
}

.block {
  display: block;
}
</style>