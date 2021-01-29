<template>
  <div id="UserAddressDetail">
    <TopTool
      :title="title"
      :hasRight="hasRight"
      :previousPage="previousPage"
      :againConfirm="againConfirm"
      :hasValidatedData="hasValidatedData"
    ></TopTool>
    <van-form @submit="onSave">
      <van-field
        v-model="recipients"
        name="recipients"
        label="收货人"
        placeholder="请输入收货人"
        center
        clearable
        :rules="[{ required: true }]"
      />
      <van-field
        v-model="phone"
        name="phone"
        label="手机号码"
        placeholder="请输入手机号码"
        center
        clearable
        :rules="[{ required: true }]"
      />
      <van-field
        v-model="region"
        name="region"
        label="地区"
        readonly
        placeholder="所在地区"
        center
        :rules="[{ required: true }]"
        @click="showRegion = true"
      />
      <van-popup v-model="showRegion" round position="bottom">
        <van-cascader
          v-model="cascaderValue"
          title="请选择所在地区"
          :options="regionOptions"
          @close="showRegion = false"
          @finish="onFinish"
        />
      </van-popup>
      <van-field
        v-model="detailAddress"
        rows="2"
        type="textarea"
        name="detailAddress"
        label="详细地址"
        placeholder="如道路,门排号,小区,楼栋号,单元室等"
        maxlength="50"
        show-word-limit
        center
        clearable
        :rules="[{ required: true }]"
      />
      <van-field
        label="地址标签"
        center
        name="address_tags"
        :rules="[{ required: true }]"
      >
        <template #input>
          <van-radio-group v-model="addressTags" direction="horizontal">
            <van-radio name="1">家</van-radio>
            <van-radio name="2">公司</van-radio>
            <van-radio name="3">学校</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field label="默认地址" center name="default_address">
        <template #input>
          <van-switch v-model="defaultAddress" />
        </template>
      </van-field>

      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          ><span class="btn">保存</span></van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
const TopTool = () => import("@/components/user/TopTool");
export default {
  name: "UserAddressDetail",
  components: { TopTool },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      hasRight: false,
      showRegion: false,
      title: "添加地址",
      previousPage: "Address",
      recipients: "",
      phone: "",
      address: "",
      cascaderValue: "",
      region: "",
      detailAddress: "",
      addressTags: "", // 地址标签
      defaultAddress: false, // 是否是默认地址
      againConfirm: true, // 返回是否提示
      hasValidatedData: [],
      regionOptions: [
        {
          text: "浙江省",
          value: "330000",
          children: [{ text: "杭州市", value: "330100" }],
        },
        {
          text: "江苏省",
          value: "320000",
          children: [{ text: "南京市", value: "320100" }],
        },
      ], // 地区选择项
    };
  },
  created() {
    let func = this.$route.query.func;
    if (func === "modify") {
      let aid = sessionStorage.getItem("aid");
      this.getAddressDetail(aid); // 请求API获取详细地址信息
    }
  },
  methods: {
    // 保存
    onSave(values) {
      // 发送请求API
      this.$router.push({ name: "Address" });
    },
    // 删除
    onDelete() {
      this.$dialog
        .confirm({
          title: "删除地址",
          message: "您确认删除该地址吗?",
        })
        .then(() => {
          console.log("删除成功!");
        })
        .catch(() => {});
    },
    // 获取详情地址
    getAddressDetail(aid) {
      // 请求API获取地址
      this.phone = "13787833290";
      this.recipients = "司云中";
      this.region = "江苏/扬州/仪征";
      this.detailAddress = "真州镇纤城小区9栋106";
      this.addressTags = "1";
      this.defaultAddress = true;
    },
    // 全部选项选择完毕后，会触发 finish 事件
    onFinish({ selectedOptions }) {
      this.showRegion = false;
      this.region = selectedOptions.map((option) => option.text).join("/");
    },
  },
};
</script>

<style scoped>
.van-cell {
  font-size: 16px !important;
  line-height: 35px;
}
.btn {
  font-size: 18px;
}
</style>