import axios from '@/axios'

/**
 * 获取用户的收藏夹商品
 */
export function getFavorites() {
    return axios.get('/consumer/chsc/apis/favorites/');
}

/**
 * 用户添加收藏夹商品
 */
export function addFavorites(data) {
    return axios.post('/consumer/chsc/apis/favorites/', data);
}

/**
 * 批量添加收藏夹商品
 */
export function addFavoritesBulk(data) {
    return axios.post('/consumer/chsc/apis/favorites/several/', data);
}

/**
 * 用户单删除收藏夹商品
 */
export function deleteFavorites(id) {
    return axios.delete('/consumer/chsc/apis/favorites/' + id + '/');
}

/**
 * 用户删除收藏夹所有商品
 */
export function deleteAllFavorites() {
    return axios.delete('/consumer/chsc/apis/favorites/destroy-all/');
}

/**
 * 用户根据一定条件搜索商品
 */
export function searchFavorites() {
    return axios.get()
}

/**
 * 寻找相似商品
 */
export function findSimilar(type) {
    return axios.get()
}