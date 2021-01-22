import axios from 'axios'

var Axios = axios.create({
    // 共用前缀,匹配config中的域名ip
    baseURL: '/api',
    // 超时时间ms
    timeout: 2000,
})

// 暴露axios使用
export default Axios