import Vue from 'vue'
import Router from 'vue-router'
import LeftNavigation from '@/components/LeftNavigation'
import Footer from '@/components/common/Footer'
import RightHelper from '@/components/RightHelper'
import swipe from '@/components/Swipe'
import RecommandGoods from '@/components/RecommandGoods'
import UniversalGoods from '@/components/UniversalGoods'
import Search from '@/components/search/Search'
Vue.use(Router)

export default new Router({
    /*  插槽, 跳转到某个路由时,该路由下的页面存在router-view标签的话,就将组件插在这个插槽中渲染显示*/
    routes: [{
            path: '/',
            /* 组件群 */
            components: {
                // name: component
                lefter: LeftNavigation, //左导航栏插槽
                footer: Footer, //底部插槽
                helper: RightHelper, // 右帮助栏插槽
                swipe: swipe, // 轮播图插槽
                recommand: RecommandGoods, // 推荐商品插槽
                universal: UniversalGoods, // 通用商品列表
            },
        },
        {
            /* 单个组件 */
            path: '/search',
            components: {
                search: Search
            },
        }
    ]
})