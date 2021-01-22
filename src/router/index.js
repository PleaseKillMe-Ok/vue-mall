import Vue from 'vue'
import Router from 'vue-router'

/* 懒加载 */
const LeftNavigation = () =>
    import ('@/components/LeftNavigation')

const Footer = () =>
    import ('@/components/common/Footer')

const RightHelper = () =>
    import ('@/components/RightHelper')

const swipe = () =>
    import ('@/components/Swipe')

const RecommandGoods = () =>
    import ('@/components/RecommandGoods')

const UniversalGoods = () =>
    import ('@/components/UniversalGoods')

const Search = () =>
    import ('@/components/search/Search')

const SelectLable = () =>
    import ('@/components/common/SelectLable')

const IndividualSpace = () =>
    import ('@/components/individual/IndividualSpace')

const HeadNavigation = () =>
    import ('@/components/common/HeadNavigation')

const Information = () =>
    import ('@/components/individual/Information')



Vue.use(Router)

export default new Router({
    /*  插槽, 跳转到某个路由时,该路由下的页面存在router-view标签的话,就将组件插在这个插槽中渲染显示*/
    routes: [{
            path: '/',
            /* 组件群 */
            components: {
                // name: component
                header: HeadNavigation, // 头部导航栏
                select: SelectLable, // 首页头部选择标签群
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
            name: 'Search',
            component: Search
        },
        {
            path: '/individual',
            name: 'IndividualSpace',
            component: IndividualSpace,
            // 子组件
            children: [
                { path: 'information', component: Information }
            ]
        }
    ]
})