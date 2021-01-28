import Vue from 'vue'
import Router from 'vue-router'

/* 懒加载 */

// 搜索界面总组件
const Search = () =>
    import ('@/components/search/Search')

// 个人空间总组件
const UserSpace = () =>
    import ('@/components/user/UserSpace')

// 个人容器
const Personal = () =>
    import ('@/components/user/Personal')

// 个人主页组件
const UserHome = () =>
    import ('@/components/user/UserHome')

// 个人设置
const UserSettings = () =>
    import ('@/components/user/UserSettings')

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

// 邮箱登录组件
const EmailLogin = () =>
    import ('@/components/auth/login/EmailLogin')

// 手机登录组件
const PhoneLogin = () =>
    import ('@/components/auth/login/PhoneLogin')

// 邮箱注册组件
const EmailRegister = () =>
    import ('@/components/auth/register/EmailRegister')

// 手机注册组件
const PhoneRegister = () =>
    import ('@/components/auth/register/PhoneRegister')

// 忘记密码组件
const ForgetPassword = () =>
    import ('@/components/auth/password/ForgetPassword')

// 用户地址列表组件
const UserAddress = () =>
    import ('@/components/user/address/UserAddress')

// 增加地址组件
const UserAddressAdd = () =>
    import ('@/components/user/address/UserAddressAdd')

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
                { path: 'individual', name: 'Individual', component: UserSpace, meta: { title: '个人中心', loginRequire: true } }
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
                { path: 'setting', name: 'Setting', component: UserSettings, meta: { loginRequire: true, title: '用户设置' } },
                { path: 'home', name: 'Home', component: UserHome, meta: { loginRequire: true, title: '个人主页' } },
                { path: 'address', name: 'Address', component: UserAddress, meta: { loginRequire: true, title: '地址设置' } },
                { path: 'add', name: 'AddAddress', component: UserAddressAdd, meta: { loginRequire: true, title: '增加地址' } }
            ],
            meta: {
                loginRequire: true,
                title: '个人空间'
            }
        },
        {
            path: '/login',
            redirect: '/login/phone'
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
            children: [
                { path: 'email', component: EmailLogin, meta: { title: '邮箱登录' } },
                { path: 'phone', component: PhoneLogin, meta: { title: '手机号登录' } }
            ]

        }, {
            // 注册路由
            path: '/register',
            name: 'Register',
            component: Register,
            children: [
                { path: 'email', component: EmailRegister, meta: { title: '邮箱注册' } },
                { path: 'phone', component: PhoneRegister, meta: { title: '手机号注册' } }
            ]
        },
        {
            // 找回密码
            path: '/forget-password',
            name: 'Forget',
            component: ForgetPassword,
        }
    ]
})