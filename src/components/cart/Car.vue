<template>
  <div id="Car">
    <button @click="choice">选择商品</button>
    <!-- 组件调用增加商品界面 -->
    <van-dialog v-model="show" title="选择商品界面" show-cancel-button>
      <!-- 将子组件数据传出来 -->
      <AddGoods @new-commodity="add"></AddGoods>
    </van-dialog>
    <!-- 购物车 -->
    <h1>购物车</h1>
    <table border="1 ">
      <thead>
        <tr>
          <th>选择</th>
          <th colspan="3 ">购物车</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            全选<input
              type="checkbox"
              name="select"
              @click="select_all"
              v-model="is_all_checked"
            />
          </td>
          <td>商品名称</td>
          <td>商品单价</td>
          <td>商品数量</td>
          <td>操作</td>
        </tr>
        <tr :key="index" v-for="(phone, index) in cart">
          <td>
            <input
              type="checkbox"
              name="select"
              :value="phone"
              v-model="select_list"
            />
          </td>
          <td>{{ phone.name }}</td>
          <td>{{ phone.price }}</td>
          <td>
            <!-- 绑定.number-->
            <input type="number " v-model.number="phone.number" />
          </td>
          <td><button @click="delete_item(index)">删除</button></td>
        </tr>
        <tr>
          <td colspan="2">总计</td>
          <td>{{ c_total_num }}元</td>
          <td>{{ c_total_count }}件</td>
          <td>
            已经选择商品名<span
              :key="index"
              v-for="(item, index) in select_list"
              >{{ item.name }},</span
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import AddGoods from "../cart/AddGoods";

export default {
  name: "Car",
  components: { AddGoods },
  data() {
    return {
      cart: [
        {
          id: 1,
          name: "iphone 12",
          price: 6000,
          number: 3,
        },
        {
          id: 2,
          name: "iphone 10",
          price: 5500,
          number: 1,
        },
        {
          id: 3,
          name: "iphone 11",
          price: 5000,
          number: 2,
        },
        {
          id: 4,
          name: "iphone 6",
          price: 3000,
          number: 4,
        },
      ],
      total_count: 0, // 总数量
      total_num: 0, // 总价格
      name: "", // 增加商品名
      price: 0, // 增加商品价格
      number: 0, // 增加商品数量
      tip: "tip", // 提示类
      select_list: [], // 维护已经添加的数据
      is_all_checked: false, // 维护是否全选按钮
      show: false, // 是否显示选择商品界面
      new_commodity: {}, // 暂存新添加的数据
    };
  },
  methods: {
    choice() {
      this.show = true;
    },
    // 增加商品
    add: function (item) {
      this.cart.push(item);
    },
    // 删除商品
    delete_item: function (index) {
      let cur_phone = this.cart[index];
      console.log(cur_phone);
      this.cart.splice(index, 1);
      // 核心:级联删除选中数组中的元素项
      for (let i = 0; i < this.select_list.length; i++) {
        if (this.select_list[i] == cur_phone) {
          this.select_list.splice(i, 1);
        }
      }
    },
    // 全选
    select_all: function () {
      if (this.is_all_checked) {
        this.is_all_checked = false;
        this.select_list = []; // 清空
      } else {
        this.select_list = []; // 先清空,以防多选
        this.is_all_checked = true;
        this.cart.forEach((element) => {
          this.select_list.push(element);
        });
      }
    },
  },

  /* 计算数据 */
  computed: {
    c_total_num: function () {
      this.total_num = 0;
      this.select_list.forEach((element) => {
        this.total_num += element.price * element.number;
      });
      return this.total_num.toFixed(2);
    },
    c_total_count: function () {
      this.total_count = 0;
      this.select_list.forEach((element) => {
        this.total_count += element.number;
      });
      return this.total_count;
    },
  },
  /* 监听选择/取消全选 */
  watch: {
    select_list: function (newValue, oldValue) {
      if (this.select_list.length === this.cart.length)
        this.is_all_checked = true;
      else this.is_all_checked = false;
    },
    new_commodity: function (newValue, oldValue) {
      console.log(newValue);
    },
  },
};
</script>

<style>
</style>