import axios from './axios'

/**
 * 用户注册
 */
export function register() {
    return axios.get('/api/consumer/chsc/apis/auth/register/', {})
}

/**
 * 用户登录
 */
export function login() {
    return axios.get('/api/consumer/chsc/apis/auth/login/', {})
}

/**
 * 绑定手机号
 */
export function bindEmail() {
    return axios.put('/api/consumer/chsc/apis/information/binding/', {})
}

/**
 * 修改个人用户名
 */
export function modifyUsername() {
    return axios.patch('/api/consumer/chsc/apis/information/detail/', {})
}

/**
 * 获取用户个人信息基本信息
 */
export function getInformation() {
    return axios.get('/api/consumer/chsc/apis/information/detail/', {})
}

/**
 * 修改密码
 */

export function modifyPassword() {
    return axios.get('/api/consumer/chsc/apis/information/password/changable/', {})
}

/**
 * 修改头像
 */

export function modifyHeadImage() {
    return axios.get('/api/consumer/chsc/apis/information/head-image/', {})
}

/**
 * 实名认证
 */
export function verificationName() {
    return axios.get('/api/consumer/verification-name-chsc-api/', {})
}

/**
 * 忘记密码-第一步
 */
export function forgetPasswordFirst() {
    return axios.post('/api/consumer/chsc/apis/information/password/retrievable/', {})
}

/**
 * 忘记密码-第二步
 */
export function forgetPasswordSecond() {
    return axios.post('/api/consumer/chsc/apis/information/password/retrievable/', {})
}

/**
 * 删除用户单个浏览足迹
 */
export function deleteSingleFoot() {
    return axios.delete('/api/consumer/chsc/apis/foot/', {})
}

/**
 * 删除用户全部浏览足迹
 */
export function deleteAllFoot() {
    return axios.delete('/api/consumer/chsc/apis/foot/destroy_all/', {})
}

/**
 * 添加用户浏览足迹
 */
export function addFoot() {
    return axios.post('/api/consumer/chsc/apis/foot/', {})
}

/**
 * 查看用户足迹
 */
export function displayFoot() {
    return axios.get('/api/consumer/chsc/apis/foot/', {})
}

/**
 * 添加商品到收藏夹
 */
export function addFavorites() {
    return axios.post('/api/consumer/chsc/apis/favorites/', {})
}