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
        v-model="province"
        name="province"
        label="地区"
        readonly
        placeholder="所在地区"
        center
        :rules="[{ required: true }]"
        @click="showRegion = true"
      />
      <van-popup v-model="showRegion" round position="bottom">
        <van-area
          :title="areaTitle"
          :area-list="provinceList"
          @confirm="choiceProvince"
          @cancel="cancelChoice"
        />
      </van-popup>
      <van-field
        v-model="region"
        rows="2"
        type="textarea"
        name="region"
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

      <div style="margin: 16px" v-if="$route.query.func === 'modify'">
        <van-button
          round
          block
          type="danger"
          native-type="button"
          @click="onDelete"
          ><span class="btn">删除</span></van-button
        >
      </div>
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
import { deleteAddress, getAddressDetail, modifyAddress } from "@/api/address";
import AreaList from "@/utils/area"; // 导入地址json
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
      areaTitle: "选中省市区",
      hasRight: false,
      showRegion: false,
      title: "添加地址",
      previousPage: "Address",
      recipients: "", // 收货人
      phone: "", // 手机号
      region: "", // 详细街道,地区
      province: "", // 省市区
      addressTags: "", // 地址标签
      defaultAddress: false, // 是否是默认地址
      againConfirm: true, // 返回是否提示
      hasValidatedData: [],
      provinceList: AreaList, // 省市区列表
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
      this.aid = sessionStorage.getItem("aid");
      this.getAddressDetail(this.aid); // 请求API获取详细地址信息
    }
  },
  methods: {
    // 修改地址
    onSave(values) {
      // 发送请求API
      let load = this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
      modifyAddress(this.aid, values)
        .then((res) => {
          let data = res.data;
          if (data.code === 36) {
            load.clear();
            this.$router.push({ name: "Address" });
          }
        })
        .catch((err) => {
          this.$toast.fail("服务器开了会小差~");
        });
    },
    // 删除
    onDelete() {
      this.$dialog
        .confirm({
          title: "删除地址",
          message: "您确认删除该地址吗?",
        })
        .then(() => {
          this.deleteAddress();
        })
        .catch(() => {});
    },
    // 获取详情地址
    getAddressDetail(aid) {
      // 请求API获取地址
      let load = this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
      getAddressDetail(aid)
        .then((res) => {
          let data = res.data;
          this.phone = data.phone;
          this.recipients = data.recipients;
          this.region = data.region;
          this.province = data.province;
          this.addressTags = data.address_tags;
          this.defaultAddress = data.default_address;
          load.clear();
        })
        .catch((err) => {
          this.$toast.fail("服务器开了会小差~");
        });
    },
    // 删除该地址记录项
    deleteAddress() {
      let load = this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
      });

      deleteAddress(parseInt(this.aid))
        .then((res) => {
          let data = res.data;
          if (data.code === 55) {
            load.clear();
            this.$toast.success("删除地址成功");
            this.$router.push({ name: "Address" });
          }
        })
        .catch((err) => {
          this.$toast.fail("服务器开了会小差~");
        });
    },

    // 选中地址
    choiceProvince(areaList) {
      let tempList = [];
      areaList.forEach((element) => {
        tempList.push(element.name);
      });
      this.province = tempList.join("/");
      this.showRegion = false;
    },
    cancelChoice() {
      this.showRegion = false;
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