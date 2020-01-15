/**
 * 工具类
 * bin 2020/01/15
 */

module.exports = {
    /**
     * String去首尾空格
     */
    trim: function(str) {
        return str.replace(/^(\u3000|\s|\t|\u00A0)*|(\u3000|\s|\t|\u00A0)*$/g, "");
    }
};
