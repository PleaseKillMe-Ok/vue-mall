import axios from '@/axios'

/**
 * 获取指定商品的详情信息
 */

export function getCommodityDetail(id) {
    return axios.get('/goods/chsc/apis/detail/?pk=' + id);
}

/**
 * 根据sku计算价格
 */

export function computeSku(data) {
    return axios.post('/goods/chsc/apis/sku/', data);
}

/**
 * 获取有效的sku
 */

export function getEffectiveSku() {
    return axios.get('/seller/chsc/apis/sku/');
}

/**
 * 获取商品一级类目
 */
export function getTopCategory() {
    return axios.get('goods/chsc/apis/first-category/')
}