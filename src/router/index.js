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
const PersonalData = () =>
    import ('@/components/individual/PersonalData')

// 个人容器
const Personal = () =>
    import ('@/components/individual/Personal')

// 个人主页组件
const PersonalHome = () =>
    import ('@/components/individual/PersonalHome')

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

// 登录容器
const Login = () =>
    import ('@/components/auth/Login')

// 注册容器
const Register = () =>
    import ('@/components/auth/Register')

Vue.use(Router)

export default new Router({
    /*  插槽, 跳转到某个路由时,该路由下的页面存在router-view标签的话,就将组件插在这个插槽中渲染显示*/
    routes: [{
            // 路由重定向
            path: '/',
            redirect: '/home',
        },
        { // 嵌套路由
            path: '/',
            component: Index,
            children: [
                { path: 'home', component: Home, meta: { title: '首页' } },
                { path: 'message', component: Message, meta: { title: '消息', loginRequire: true } },
                { path: 'cart', component: Cart, meta: { title: '购物车', loginRequire: true } },
                { path: 'individual', component: IndividualSpace, meta: { title: '个人中心', loginRequire: true } }
            ],
        },
        {
            path: '/search',
            name: 'Search',
            component: Search,
            meta: {
                loginRequire: true,
                title: '搜索'
            }
        },
        {
            path: '/personal',
            redirect: '/personal/home',
            meta: {
                loginRequire: true,
                title: '个人信息'
            }
        },
        {
            // 个人空间路由
            path: '/personal',
            name: 'Personal',
            component: Personal,
            children: [
                { path: 'data', component: PersonalData, meta: { loginRequire: true, title: '个人信息' } },
                { path: 'home', component: PersonalHome, meta: { loginRequire: true, title: '个人主页' } }
            ],
            meta: {
                loginRequire: true,
                title: '个人空间'
            }
        },
        {
            // 登录路由
            path: '/login',
            name: 'Login',
            component: Login,
            meta: {
                title: '登录'
            }

        }, {
            // 注册路由
            path: '/register',
            name: 'Register',
            component: Register,
            meta: {
                title: '注册'
            }
        },
    ]
})