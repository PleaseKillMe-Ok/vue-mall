<template>
  <div id="UserAddress">
    <TopTool
      :title="title"
      :hasRight="hasRight"
      :previousPage="previousPage"
    ></TopTool>
    <div class="card">
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
  </div>
</template>

<script>
const TopTool = () => import("@/components/user/TopTool");
import { getAddress, setDefaultAddress } from "@/api/address";
export default {
  name: "UserAddress",
  components: { TopTool },
  data() {
    return {
      title: "地址管理",
      hasRight: false,
      previousPage: "Setting", // 上一页路由名
      chosenAddressId: -1, // 选中的列表id
      addressList: [],
    };
  },
  created() {
    if (this.$route.query.previous) {
      this.previousPage = this.$route.query.previous;
    }

    // 获取收货地址
    this.getAddress();
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
      let load = this.$toast.loading({
        message: "加载中...",
        forbidClic: true,
      });
      setDefaultAddress(item.id)
        .then((res) => {
          if (res.data.code === 1015) {
            load.clear();
            this.$toast.success("默认地址更换成功");
            this.addressList.forEach((element) => {
              element.isDefault = false;
            });
            item.isDefault = true;
          }
        })
        .catch((err) => {
          this.$toast.fail("服务器开了会小差~");
        });
    },
    // 获取收货地址
    getAddress() {
      getAddress()
        .then((res) => {
          let data = res.data;
          data.forEach((element) => {
            this.addressList.push({
              id: element.pk,
              name: element.recipient,
              tel: element.phone,
              address: this.parseAddress(element.province, element.region),
              isDefault: element.default_address,
            });
            // 设置默认选中的id
            if (data.length > 0) {
              this.chosenAddressId = this.addressList[0].id;
            }
          });
        })
        .catch((err) => {
          this.$toast.fail("服务器开了会小差~");
        });
    },
    // 解析地址字段
    parseAddress(province, region) {
      return province, region;
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