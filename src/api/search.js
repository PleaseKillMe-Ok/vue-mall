import axios from '@/axios'

/**
 * 搜索商品
 * @param {页数} page 
 * @param {关键字} value 
 */
export function search(page, value) {
    return axios.get('/search/chsc/apis/search/?page=' + page + '&text=' + value);
}