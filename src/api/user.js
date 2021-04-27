import axios from '@/axios'

/**
 * 用户注册
 */
export function register(data) {
    return axios.post('/consumer/chsc/apis/auth/register/', data)
}

/**
 * 用户登录
 */
export function login(data) {
    return axios.post('/consumer/chsc/apis/auth/login/', data)
}

/**
 * 绑定手机号
 */
export function bindEmail() {
    return axios.put('/consumer/chsc/apis/information/binding/', {})
}

/**
 * 修改个人用户名
 */
export function modifyUsername() {
    return axios.patch('/consumer/chsc/apis/information/detail/', {})
}

/**
 * 获取用户个人信息基本信息
 */
export function getInformation() {
    return axios.get('/consumer/chsc/apis/information/detail/', {})
}

/**
 * 修改密码
 */

export function modifyPassword() {
    return axios.get('/consumer/chsc/apis/information/password/changable/', {})
}

/**
 * 修改头像
 */

export function modifyHeadImage() {
    return axios.get('/consumer/chsc/apis/information/head-image/', {})
}

/**
 * 实名认证
 */
export function verificationName() {
    return axios.get('/consumer/verification-name-chsc-api/', {})
}

/**
 * 忘记密码-第一步
 */
export function forgetPasswordFirst() {
    return axios.post('/consumer/chsc/apis/information/password/retrievable/', {})
}

/**
 * 忘记密码-第二步
 */
export function forgetPasswordSecond() {
    return axios.post('/consumer/chsc/apis/information/password/retrievable/', {})
}

/**
 * 添加商品到收藏夹
 */
export function addFavorites() {
    return axios.post('/consumer/chsc/apis/favorites/', {})
}

/**
 * 获取用户额外信息
 */
export function getExtraCount() {
    return axios.get('/consumer/chsc/apis/extra/count/')
}

/**
 * 记录用户浏览的商品
 */
export function recordUserFoot(data) {
    return axios.post('/consumer/chsc/apis/foot/', data)
}

/**
 * 注销账户
 */
export function discard() {
    return axios.delete('/consumer/chsc/apis/safe/discard/');
}

/**
 * 开店
 */
export function openStore(data) {
    return axios.post('/seller/chsc/apis/store/', data);
}