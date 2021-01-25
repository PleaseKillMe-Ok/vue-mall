// 正则校验器
export function universalValidator(regex, value) {
    return regex.test(value)
}

// 用户名校验器
export function usernameValidator(value) {
    let regex = /^\w{1,20}$/
    return regex.test(value)
}

// 密码校验器
export function passwordValidator(value) {
    let regex = /^\w{8,20}$/
    return regex.test(value)
}

// 验证码校验器
export function codeValidator(value) {
    let regex = /^\w{6}$/
    return regex.test(value)
}

// 邮箱校验器
export function emailValidator(value) {
    let regex = /^([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+.[a-zA-Z]{2,3}$/
    return regex.test(value)
}

// 手机号校验器
export function phoneValidator(value) {
    let regex = /^1[3,4,5,7,8,9][0-9]{9}$/
    return regex.test(value)
}