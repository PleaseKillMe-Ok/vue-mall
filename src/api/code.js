import axios from '@/axios'

/**
 * 发送验证码
 */
export function sendRegister(data) {
    return axios.post('/universal/chsc/apis/verification-code/register/', data)
}