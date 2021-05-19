let OSS = require('ali-oss')
let client = new OSS({
    region: 'oss-cn-beijing',
    accessKeyId: 'LTAI4GH3uY3Vh3bxVApYMXyJ',
    accessKeySecret: 'shUjJWXTMwcVCesglFzNZgYe5EWtFo',
    bucket: 'vue-e-mall'
})

export default client