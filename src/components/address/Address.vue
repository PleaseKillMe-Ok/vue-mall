<template>
  <div id="Address">
    <van-address-list
      v-for="item in addressList"
      :key="item.id"
      default-tag-text="默认"
      v-model="chosenAddressId"
      @add="onAdd"
      @edit="onEdit"
    />
  </div>
</template>

<script>
export default {
  name: "Address",
  data() {
    return {
      chosenAddressId: "1",  // 选中的列表id
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
  methods:{
      // 新增地址
      onAdd(){},
      // 编辑
      onEdit(item, index){}
  }
};
</script>

<style>
</style>