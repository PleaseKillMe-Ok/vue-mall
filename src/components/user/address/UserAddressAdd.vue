<template>
  <div id="UserAddressAdd">
    <TopTool
      :title="title"
      :hasRight="hasRight"
      :previousPage="previousPage"
      :againConfirm="againConfirm"
    ></TopTool>
    <van-form>
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
        placeholder="所在地区"
        center
        clearable
        :rules="[{ required: true }]"
      />
      <van-field
        v-model="detailAddress"
        name="detailAddress"
        label="详细地址"
        placeholder="如道路,门排号,小区,楼栋号,单元室等"
        center
        clearable
        :rules="[{ required: true }]"
      />
      <van-field label="地址标签" center name="address_tags">
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
  name: "UserAddressAdd",
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
      title: "添加地址",
      previousPage: "Address",
      recipients: "",
      phone: "",
      address: "",
      detailAddress: "",
      addressTags: "", // 地址标签
      defaultAddress: "", // 是否是默认地址
      againConfirm: true, // 返回是否提示
    };
  },
  methods: {
    // 保存
    onSave() {},
    // 删除
    onDelete() {},
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