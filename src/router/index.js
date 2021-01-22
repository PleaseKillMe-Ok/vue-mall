import Vue from 'vue'
import Router from 'vue-router'

/* 懒加载 */

// 搜索界面总组件
const Search = () =>
    import ('@/components/search/Search')

// 个人空间总组件
const IndividualSpace = () =>
    import ('@/components/individual/IndividualSpace')

// 个人信息组件
const Information = () =>
    import ('@/components/individual/Information')

// 总组件
const Index = () =>
    import ('@/components/Index')

// 首页组件
const Home = () =>
    import ('@/components/Home')

// 消息总组件
const Message = () =>
    import ('@/components/message/Message')

// 购物车总组件
const Cart = () =>
    import ('@/components/cart/Cart')

Vue.use(Router)

export default new Router({
    /*  插槽, 跳转到某个路由时,该路由下的页面存在router-view标签的话,就将组件插在这个插槽中渲染显示*/
    routes: [{
            // 路由重定向
            path: '/',
            redirect: '/home'
        },
        { // 首页路由
            path: '/',
            component: Index,
            children: [
                { path: 'home', component: Home },
                { path: 'message', component: Message },
                { path: 'cart', component: Cart },
                { path: 'individual', component: IndividualSpace }
            ]
        },
        {
            // 搜索路由
            path: '/search',
            name: 'Search',
            component: Search
        },
        { // 个人空间路由
            path: '/individual',
            name: 'IndividualSpace',
            component: IndividualSpace,
            children: [
                { path: 'information', component: Information }
            ]
        }
    ]
})