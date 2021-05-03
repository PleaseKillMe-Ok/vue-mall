import axios from '@/axios'
/**
 * 获取指定tid的商品及店铺，sku，运费的数据
 * @param {tid的id列表} data 
 */
export function getSeveralCommodityDetail(data) {
    return axios.post('/order/chsc/apis/confirmation/', data)
}

/**
 * 根据订单状态号获取该用户下所有的订单数据
 * @param {订单状态号} status 
 */
export function displayOrder(status) {
    return axios.get('/order/chsc/apis/order/?status=' + status)
}