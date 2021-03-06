// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from './axios'

// 移动端UI
import Vant from 'vant'
import 'vant/lib/index.css'
import { Lazyload } from 'vant';

// 作为中间件
Vue.use(Vant)
Vue.config.productionTip = false

// // 注册懒加载组件
// Vue.use(Lazyload);

// 注册时可以配置额外的选项
Vue.use(Lazyload, {
    lazyComponent: true,
});

// 引入axios,替换本来的Http模块
Vue.prototype.$http = axios

/* 导航守卫,校验是否登录 */
router.beforeEach((to, from, next) => {
    console.log(to.meta)
        // 根据meta中的属性动态添加title
    if (to.meta.title) {
        document.title = to.meta.title
    }
    if (to.meta.loginRequire && !sessionStorage.getItem('Bearer-Token')) {
        next({ name: 'LoginEmail', query: { redirect: to.fullPath } }) // 未登录,跳转/login, 登入后,回跳到目标视图
            // next({ name: 'LoginEmail', query: { redirect: to.fullPath } })
    } else
        next() // 已经登录,进入视图界面
})

/* eslint-disable no-new */
/* 生成Vue实例 */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})