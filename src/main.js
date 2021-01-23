// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from './axios'

// 移动端UI
import Vant from 'vant'
import 'vant/lib/index.css'

// 作为中间件
Vue.use(Vant)
Vue.config.productionTip = false

// 引入axios,替换本来的Http模块
// Vue.prototype.$http = axios

/* eslint-disable no-new */
/* 生成Vue实例 */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})