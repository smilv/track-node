/*
 * @Description: 工具类
 * @Autor: bin
 * @Date: 2020-01-15 18:11:44
 * @LastEditors: bin
 * @LastEditTime: 2020-05-06 17:54:22
 */

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
    }
};
