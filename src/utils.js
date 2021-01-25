// 正则校验器
export function universalValidator(regex, value) {
    return regex.test(value)
}