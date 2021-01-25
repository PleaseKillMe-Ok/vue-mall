import axios from '@/axios'

/**
 * 添加收货地址
 */
export function addAddress() {
    return axios.post('/api/consumer/chsc/apis/address/', {})
}

/**
 * 查询收货地址
 */
export function displayAddress() {
    return axios.get('/api/consumer/address-chsc-api/', {})
}

/**
 * 修改默认收货地址
 */
export function modifyDefaultAddress() {
    return axios.put('/api/consumer/chsc/apis/address/update_default_address/', {})
}

/**
 * 修改地址信息
 */
export function modifyAddressDetail() {
    return axios.put('/api/consumer/chsc/apis/address/', {})
}

/**
 * 删除地址信息
 */
export function deleteAddress() {
    return axios.delete('/api/consumer/address-chsc-api/', {})
}