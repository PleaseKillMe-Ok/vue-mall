import axios from '@/axios'

/**
 * 发送验证码注册
 */
export function sendRegister(data) {
    return axios.post('/universal/chsc/apis/verification-code/register/', data)
}

/**
 * 发送验证码登录
 * 
 */

export function sendLogin(data) {
    return axios.post('/universal/chsc/apis/verification-code/login/', data)
}