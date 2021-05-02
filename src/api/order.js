import axios from '@/axios'
/**
 * 
 */
export function getSeveralCommodityDetail(data) {
    return axios.post('/order/chsc/apis/confirmation/', data)
}