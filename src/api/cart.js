import axios from '@/axios'

/**
 * 将目标商品添加进购物车
 */
export function addToCart(data) {
    return axios.post('/consumer/chsc/apis/trolley/', data)
}

/**
 * 修改购物车中某商品的数量
 */
export function modifySkuCount(data) {
    return axios.put('/consumer/chsc/apis/trolley/count/', data)
}

/**
 * 获取购物车中商品信息
 */
export function getCartInfo() {
    return axios.get('/consumer/chsc/apis/trolley/')
}


/**
 * 删除购物车中所有数据
 */
export function deleteCartAll() {
    return axios.delete('/consumer/chsc/apis/trolley/all/')
}

/**
 * 删除指定购物车中的记录,传递body数据
 */
export function deleteCartSeveral(data) {
    return axios.delete('/consumer/chsc/apis/trolley/several/', { data: data })
}