import axios from '@/axios'

/**
 * 搜索商品
 * @param {关键字} q 
 */
export function search(q) {
    return axios.get('/goods/chsc/apis/keyword/?q=' + q);
}

/**
 * 获取用户的历史浏览记录
 */
export function getHistory() {
    return axios.get('/search/chsc/apis/history/');
}

/**
 * 获取热搜排行榜数据
 */
export function getHeat() {
    return axios.get('/search/chsc/apis/heat/');
}

/**
 * 单/群删历史记录
 * @param {是否单删} isNull
 * @param {关键词} keyword
 */
export function deleteHistory(isNull = false, keyword = null) {
    if (isNull && keyword == null)
        return axios.delete('/search/chsc/apis/history/?many=true')
    else if (!isNull && keyword != null)
        return axios.delete('/search/chsc/apis/history/?key=' + keyword);
}