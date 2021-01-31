<template>
  <div id="BindPhone">
    <TopTool
      :title="title"
      :hasRight="false"
      :previousPage="previousPage"
    ></TopTool>
    <div class="steps-style">
      <van-steps :active="active" class="step">
        <van-step v-for="(item, index) in stepList" :key="index">
          <span class="step-title">{{ item.title }}</span>
        </van-step>
      </van-steps>
    </div>
    <van-form @submit="next">
      <div v-if="isExisted && active === 0">
        <van-field
          class="field"
          v-model="oldPhone"
          placeholder="请输入旧手机号"
          name="old_phone"
          label="旧手机号"
          center
          clearable
          :rules="[
            { required: true, message: '请填写旧手机号' },
            { validator: phoneValidator, message: '手机号格式不正确' },
          ]"
        />
      </div>
      <div v-if="active === 0">
        <van-field
          class="field"
          v-model="phone"
          placeholder="请输入新手机号"
          name="phone"
          label="新手机号"
          center
          clearable
          :rules="[
            { required: true, message: '请填写新手机号' },
            { validator: phoneValidator, message: '手机号格式不正确' },
            { validator: sameValidator, message: '两次手机号不能一样' },
          ]"
        />
        <van-field
          class="field"
          v-model="code"
          placeholder="请输入验证码"
          name="code"
          label="验证码"
          maxlength="6"
          center
          clearable
          validate-first
          :rules="[
            { required: true, message: '请输入验证码' },
            { validator: codeValidator, message: '验证码格式不正确' },
          ]"
        >
          <!-- 插槽:插入发送验证码按钮 -->
          <template #button>
            <van-button
              size="small"
              type="info"
              native-type="button"
              @click="sendCode"
              >发送验证码</van-button
            >
          </template>
        </van-field>
      </div>
      <van-button
        block
        round
        color="linear-gradient(to right, #ff6034, #ee0a24)"
        size="large"
        class="next-btn"
        native-type="submit"
      >
        <span v-if="active === 0">下一步</span>
        <span v-if="active === 1">绑定完成</span>
      </van-button>
    </van-form>
  </div>
</template>

<script>
const TopTool = () => import("@/components/user/TopTool");
import { phoneValidator, codeValidator } from "@/validators";
export default {
  name: "BindPhone",
  components: { TopTool },
  data() {
    return {
      title: "改绑手机",
      previousPage: "Safe",
      phone: "",
      oldPhone: "",
      code: "",
      isExisted: false,
      active: 0,
      stepList: [
        {
          title: "绑定手机",
        },
        {
          title: "成功",
        },
      ],
    };
  },
  created() {
    // 获取手机号
    this.phone = sessionStorage.getItem("tempPhone");
    sessionStorage.removeItem("tempPhone");
    if (this.phone !== "") this.isExisted = true;
  },
  methods: {
    // 下一步
    next() {
      if (this.active === 1) {
        this.$router.push({ name: "Safe" });
      } else {
        this.active++;
      }
    },
    // 校验字段
    phoneValidator(value) {
      return phoneValidator(value);
    },
    codeValidator(value) {
      return codeValidator(value);
    },
    sameValidator(value) {
      console.log(this.oldPhone !== this.phone);
      return this.oldPhone !== this.phone;
    },
    // 请求验证码API,获取验证码,后台生成唯一身份识别码
    sendCode() {},
  },
};
</script>

<style scoped>
.step-title {
  font-size: 0.9rem;
}
.step {
  text-align: left !important;
}

/* 字段布局 */
.field {
  font-size: 0.9rem;
  margin-top: 15px;
  margin-bottom: 20px;
}

/* 居中布局 */
.next-btn {
  margin-top: 30px;
  width: 60%;
  display: inline-block;
}
</style>