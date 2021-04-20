import axios from '@/axios'

/**
 * 获取指定商品的详情信息
 */

export function getCommodityDetail(id) {
    return axios.get('/goods/chsc/apis/detail/?pk=' + id);
}