import Vue from 'vue'
import Router from 'vue-router'
import HeadNavigation from '@/components/HeadNavigation'
import LeftNavigation from '@/components/LeftNavigation'
import Footer from '@/components/Footer'
import RightHelper from '@/components/RightHelper'
import CarouselMap from '@/components/CarouselMap'
import RecommandGoods from '@/components/RecommandGoods'
import UniversalGoods from '@/components/UniversalGoods'

Vue.use(Router)

export default new Router({
    /*  插槽, 跳转到某个路由时,该路由下的页面存在router-view标签的话,就将组件插在这个插槽中渲染显示*/
    routes: [{
        path: '/',
        name: 'HeadNavigation',
        component: HeadNavigation
    }, {
        /* 左导航栏插槽*/
        path: '/',
        name: 'LeftNavigation',
        component: LeftNavigation
    }, {
        /* 底部插槽*/
        path: '/',
        name: 'Footer',
        component: Footer
    }, {
        /* 右帮助栏插槽*/
        path: '/',
        name: 'RightHelper',
        component: RightHelper
    }, {
        /* 轮播图插槽*/
        path: '/',
        name: 'CarouselMap',
        component: CarouselMap
    }, {
        /* 推荐商品插槽 */
        path: '/',
        name: 'RecommandGoods',
        component: RecommandGoods
    }, {
        /* 通用商品列表 */
        path: '/',
        name: 'UniversalGoods',
        component: UniversalGoods
    }]
})