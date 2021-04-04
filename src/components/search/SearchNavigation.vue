<template>
  <div class="HeadNavigation">
    <van-nav-bar
      :right-text="rightText"
      v-model="previous"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
      fixed
    >
      <template #title>
        <van-search
          v-model="searchValue"
          placeholder="请输入搜索关键词"
          input-align="center"
          shape="round"
          maxlength="30"
          @input="onInput"
          @clear="onClear"
          show-action
          ><template #action>
            <van-button
              @click="onSearch"
              round
              type="warning"
              class="search-btn"
              ><span>搜索</span></van-button
            >
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
const Helper = () => import("@/components/common/Helper");
import { search } from "@/api/search";
export default {
  name: "HeadNavigation",
  components: { Helper },
  data() {
    return {
      show: false,
      searchValue: "",
      rightText: "帮助",
      previous: "",
      url: "",
      page: 1, // 默认page为1
    };
  },
  methods: {
    // 返回前一页
    onClickLeft() {
      this.$router.push("/");
    },
    // 显示帮助栏
    onClickRight() {
      this.show = true;
    },
    // 搜索按钮点击事件,请求后台API
    onSearch() {
      if (this.searchValue !== "") {
        search(this.page, this.searchValue)
          .then((res) => {
            // let data = res.data; // 模拟获取到的数据
            // this.$emit("displayResult", true, data); // 传递给父组件,切换父组件的子组件,将数据传递给父组件,显示搜索结果
          })
          .catch((err) => {
            Toast.fail("服务器太累了,需要休息一会~");
          });
      } else {
        Toast.fail("请输入关键词");
      }
    },
    // 根据用户搜索自动匹配模糊关键字名, 动态请求后台api获取模糊关键字名
    onInput(value) {
      // 如果搜索有数据的话就请求API
      // if (value !== "") {
      //   search(this.page, this.searchValue)
      //     .then((res) => {
      //       let data = res.data;
      //       this.$emit("displayResult", true, data);
      //     })
      //     .catch((err) => {
      //       Toast.fail("服务器太累了,需要休息一会~");
      //     });
      // }
    },
    onClear() {
      this.$emit("displayResult", false);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* 搜索框 */
.van-search--show-action {
  height: 46px;
}

/* 搜索按钮 */
.search-btn {
  height: 29px;
  font-size: 14px;
  background-color: #7232dd;
  border: none;
  padding: 10px;
  margin: 5px auto;
}
</style>
