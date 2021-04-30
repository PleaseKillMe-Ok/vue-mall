<template>
  <div id="Category">
    <!-- 头部导航栏组件 -->
    <HeaderLine></HeaderLine>

    <!-- 分类选择栏 -->
    <van-tree-select
      height="690px"
      :items="items"
      :main-active-index.sync="active"
      class="tree-select"
    >
      <template #content>
        <div v-for="(content, index) in items" :key="index">
          <div v-if="active === index">
            <!-- 布局第二级别类目及以下,开启滑动标签栏 -->
            <div
              v-if="
                secondCategoryMap[items[index].pk] == null ||
                secondCategoryMap[items[index].pk].length === 0
              "
              class="none-category"
            >
              抱歉，该目录下尚无分类
            </div>
            <div v-else>
              <van-tabs v-model="secondActive" scrollspy sticky>
                <van-tab
                  v-for="(value, key) in secondCategoryMap[items[index].pk]"
                  :title="value.name"
                  :key="key"
                >
                  <!-- 二级类目名 -->
                  <van-row>
                    <van-cell span="24" class="secName">{{
                      value.name
                    }}</van-cell>
                  </van-row>
                  <!-- 三级类目信息 -->
                  <!-- 每三个三个布局 -->
                  <van-row
                    v-for="(numberRow, indexRow) in Math.ceil(
                      value.child.length / 3
                    )"
                    :key="indexRow"
                  >
                    <van-col
                      v-for="(numCol, indexCol) in 3"
                      :key="indexCol"
                      span="8"
                      @click="
                        goToComodity(value.child[indexRow * 3 + indexCol].name)
                      "
                    >
                      <!-- 防止数组越界 -->
                      <span v-if="indexRow * 3 + indexCol < value.child.length">
                        <img
                          src="https://django-e-mall.oss-cn-shanghai.aliyuncs.com/u%3D3324287611%2C3832720410%26fm%3D26%26gp%3D0.jpg"
                          width="55px"
                          height="auto"
                          style="display: block; padding-top: 10px"
                        />
                        <span>{{
                          value.child[indexRow * 3 + indexCol].name
                        }}</span>
                      </span>
                    </van-col>
                  </van-row>
                </van-tab>
              </van-tabs>
            </div>
          </div>
        </div>
      </template>
    </van-tree-select>
  </div>
</template>

<script>
const HeaderLine = () => import("@/components/common/HeaderLine");
import { getTopCategory, getSecondLeftCategroy } from "@/api/commodity";
export default {
  name: "Category",
  data() {
    return {
      active: 0, // 一级类目index
      secondActive: 0, // 二级类目index
      items: [], // 存放商品一级类目列表
      secondCategoryMap: {}, // 存放一级类目对应二级类目下的类别列表，采用map，便于缓存
    };
  },
  components: { HeaderLine },
  created() {
    this.getFirstCategory();
  },
  watch: {
    active(newValue, oldValue) {
      let id = this.items[newValue].pk; // 获取一级类目id
      this.getSecondCategory(id);
    },
    items(newValue, oldValue) {
      this.getSecondCategory(this.items[0].pk); // 默认显示一个二级类目下的类别信息
    },
  },
  methods: {
    // 获取一级类目
    getFirstCategory() {
      getTopCategory()
        .then((res) => {
          this.items = res.data;
        })
        .catch((err) => {
          this.$toast.fail("获取顶级目录失败");
        });
    },

    // 根据指定一级目录查找下级目录
    getSecondCategory(id) {
      if (this.secondCategoryMap[id] == null) {
        // 如果之前一次都没请求过，无须请求
        let load = this.$toast.loading({
          message: "加载中...",
          forbidClick: true,
        });
        getSecondLeftCategroy(id)
          .then((res) => {
            let data = res.data;
            this.$set(this.secondCategoryMap, id, new Array()); // 设置为响应式
            this.secondCategoryMap[id] = data;
            load.clear();
          })
          .catch((err) => {
            this.$toast.fail("获取二级及以下类目失败,服务器开了会小差～");
            load.clear();
          });
        // load.clear();
      }
    },

    // 根据用户选择的类别名搜索相关商品
    goToComodity(name) {
      this.$router.push({
        name: "SearchCard",
        query: { keyword: name, previous: this.$route.path },
      });
    },
  },
};
</script>

<style>
.tree-select {
  margin-top: 46px;
  margin-bottom: 50px;
}

/* 二级标题 */
.secName {
  float: left;
  font-size: 16px;
  margin-top: 5px;
  font-weight: 600;
}

/* 三级类目标题 */
.thirdName {
  width: 33.3%;
  text-align: center;
}

/* 该目录下尚无分类 */
.none-category {
  margin-top: 50%;
  font-size: 22px;
  opacity: 0.7;
  color: grey;
}
</style>