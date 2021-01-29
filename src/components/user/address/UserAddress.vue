<template>
  <div id="UserAddress">
    <TopTool
      :title="title"
      :hasRight="hasRight"
      :previousPage="previousPage"
    ></TopTool>
    <div class="address">
      <van-address-list
        :list="addressList"
        default-tag-text="默认"
        v-model="chosenAddressId"
        @add="onAdd"
        @edit="onEdit"
        @select="setDefault"
      />
    </div>
  </div>
</template>

<script>
const TopTool = () => import("@/components/user/TopTool");
export default {
  name: "UserAddress",
  components: { TopTool },
  data() {
    return {
      title: "地址管理",
      hasRight: false,
      previousPage: "Setting", // 上一页路由名
      chosenAddressId: "1", // 选中的列表id
      addressList: [
        {
          id: "1",
          name: "司云中",
          tel: "13787833290",
          address: "江苏省扬州市纤城小区9栋106",
          isDefault: true,
        },
        {
          id: "2",
          name: "李四",
          tel: "1310000000",
          address: "江苏省扬州市纤城小区9栋106",
        },
        {
          id: "3",
          name: "李四",
          tel: "1310000000",
          address: "江苏省扬州市纤城小区9栋106",
        },
      ],
    };
  },
  methods: {
    // 地址详细信息(增加)
    onAdd() {
      this.$router.push({ name: "AddressDetail", query: { func: "add" } });
    },
    // 地址详细信息(编辑)
    onEdit(item, index) {
      sessionStorage.setItem("aid", item.id); // 暂存id
      this.$router.push({ name: "AddressDetail", query: { func: "modify" } });
    },
    // 切换默认地址
    setDefault(item, index) {
      // 发送请求,切换默认地址
      this.addressList.forEach((element) => {
        element.isDefault = false;
      });
      item.isDefault = true;
    },
  },
};
</script>

<style scoped>
.address {
  padding: 5px;
  background-color: #fff;
  border-radius: 8px;
}
</style>