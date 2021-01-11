<template>
  <div class="HeadNavigation">
    <van-nav-bar
      :left-text="left_text"
      :right-text="right_text"
      v-model="previous"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <template #title>
        <van-search
          v-model="search_value"
          placeholder="请输入搜索关键词"
          input-align="center"
          shape="round"
          maxlength="30"
          @input="onInput"
          show-action
          ><template #action>
            <div @click="onSearch">搜索</div>
          </template></van-search
        >
      </template>
    </van-nav-bar>
    <!-- 帮助文档 -->
    <van-dialog v-model="show" title="帮助文档" show-cancel-button>
      <!-- 将子组件数据传出来 -->
      <Helper></Helper>
    </van-dialog>
  </div>
</template>



<script>
import { Toast } from "vant";
import Helper from "../common/Helper";
export default {
  name: "HeadNavigation",
  components: { Helper },
  data() {
    return {
      show: false,
      search_value: "",
      left_text: "返回",
      right_text: "帮助",
      previous: "",
    };
  },
  methods: {
    // 导航栏左侧点击事件
    onClickLeft() {
      Toast.success(this.previous);
    },
    // 导航栏右侧点击事件
    onClickRight() {
      this.show = true;
    },
    // 搜索按钮点击事件,请求后台API,地址:http://127.0.0.1:8000/search/search-chsc-api/?page=1&text=switch
    onSearch() {
      console.log(this.search_value);
    },
    // 根据用户搜索自动匹配模糊关键字名, 动态请求后台api获取模糊关键字名
    onInput(value) {},
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.van-nav-bar__content {
  height: 60px !important;
  background-color: #e66838;
}
</style>
