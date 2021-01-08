<template>
  <div id="add_goods">
    <!-- 全部基于函数校验 -->
    <van-form validate-first submit-on-enter @submit="onSubmit">
      <van-field
        v-model="name"
        type="text"
        name="name"
        label="商品名称"
        placeholder="请输入商品名称"
        :rules="[
          { validate_name, required: true, message: '请填写正确的商品名程', trigger:'onChange' },
        ]"
      />
      <van-field
        v-model="price"
        type="number"
        name="price"
        label="商品价格"
        placeholder="商品价格"
        :rules="[{ validate_price, required: true, message: '请填写商品价格', trigger:'onChange' }]"
      />
      <van-field
        v-model="number"
        type="number"
        name="number"
        label="商品数量"
        placeholder="商品数量"
        :rules="[
          { validate_number, required: true, message: '请填写商品数量', trigger:'onChange' },
        ]"
      />

      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  name: "add_goods",
  data() {
    return {
      name: "",
      price: 0,
      number: 0
    };
  },
  methods: {
    /* 校验成功返回true, 失败返回false */
    validate_name(val) {
      // if (val !== "") return true;
      // return false;
    },
    validate_price(val) {
      return /1\d{1,10}/.test(val);
    },
    validate_number(val) {
      return /1\d{1,10}/.test(val);
    },
    /* 数据转发到父组件 */
    onSubmit() {
      let result = {
        name:this.name,
        price:parseInt(this.price),  // 解析int类型
        number:parseInt(this.number),
      }
      this.$emit('new-commodity', result);
      this.name = '';
      this.price = 0;
      this.number = 0;
    },
  },
};
</script>

<style>
</style>