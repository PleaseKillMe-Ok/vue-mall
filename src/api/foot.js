import axios from '@/axios'

/**
 * 删除用户单个浏览足迹
 */

export function deleteSingleFoot(id) {
    return axios.delete('/consumer/chsc/apis/foot/' + id + '/');
}

/**
 * 删除用户全部浏览足迹
 */
export function deleteAllFoot() {
    return axios.delete('/consumer/chsc/apis/foot/destroy_all/', {})
}

/**
 * 添加用户浏览足迹
 */
export function addFoot() {
    return axios.post('/consumer/chsc/apis/foot/', {})
}

/**
 * 查看用户足迹
 */
export function displayFoot() {
    return axios.get('/consumer/chsc/apis/foot/')
}