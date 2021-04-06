import axios from '@/axios'

/**
 * 获取收货地址
 */
export function getAddress() {
    return axios.get('/consumer/chsc/apis/address/')
}

/**
 * 设置默认地址
 */
export function setDefaultAddress(pk) {
    return axios.put('/consumer/chsc/apis/address/' + pk + '/default/')
}

/**
 * 删除收货地址
 */
export function deleteAddress(pk) {
    return axios.delete('/consumer/chsc/apis/address/' + pk + '/')
}

/**
 * 获取收货地址详情
 */
export function getAddressDetail(pk) {
    return axios.get('/consumer/chsc/apis/address/' + pk + '/')
}

/**
 * 修改收货地址信息
 */
export function modifyAddress(pk, data) {
    return axios.put('/consumer/chsc/apis/address/' + pk + '/', data)
}

/**
 * 添加收货地址
 */
export function addAddress(data) {
    return axios.post('/consumer/chsc/apis/address/', data)
}