/*
 * @Description: 工具类
 * @Autor: bin
 * @Date: 2020-01-15 18:11:44
 * @LastEditors: bin
 * @LastEditTime: 2020-06-23 16:22:11
 */
const crypto = require("crypto");

module.exports = {
    /**
     * String去首尾空格
     */
    trim: function(str) {
        return str.replace(/^(\u3000|\s|\t|\u00A0)*|(\u3000|\s|\t|\u00A0)*$/g, "");
    },
    /**
     * 是否是String
     */
    isString: function(s) {
        return typeof s === "string" || s instanceof String;
    },
    /**
     * md5加密
     * @param {String} content
     */
    md5: function(content) {
        const hash = crypto
            .createHash("md5")
            .update(content.toString())
            .digest("hex");
        return hash;
    },
    /**
     * @description: 生成加密强度高的伪随机数据
     * @param {Number} size 字节
     * @return: promise <Buffer>
     */
    randomBytes: function(size) {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(size, (err, buf) => {
                if (err) {
                    reject(err);
                }
                resolve(buf);
            });
        });
    }
};
