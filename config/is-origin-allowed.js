/*
 * @Description: cors跨域白名单设置
 * @Autor: bin
 * @Date: 2020-01-06 18:28:19
 * @LastEditors: bin
 * @LastEditTime: 2020-05-06 17:53:10
 */
const utils = require("../lib/utils");

/**
 * 白名单列表，支持正则
 */
const whiteList = [/^http:\/\/localhost/, /\.duia\.com/];

/**
 * 查看当前请求来源是否在白名单列表内
 * @param {*} origin 当前请求头origin
 * @param {*} allowedOrigin 白名单列表
 */
function isOriginAllowed(origin, allowedOrigin = whiteList) {
    if (Array.isArray(allowedOrigin)) {
        for (var i = 0; i < allowedOrigin.length; i++) {
            if (isOriginAllowed(origin, allowedOrigin[i])) {
                return true;
            }
        }
        return false;
    } else if (utils.isString(allowedOrigin)) {
        return origin === allowedOrigin;
    } else if (allowedOrigin instanceof RegExp) {
        return allowedOrigin.test(origin);
    } else {
        return !!allowedOrigin;
    }
}

module.exports = isOriginAllowed;
