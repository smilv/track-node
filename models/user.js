/*
 * @Description: 用户-模型
 * @Autor: bin
 * @Date: 2020-01-16 16:01:25
 * @LastEditors: bin
 * @LastEditTime: 2020-05-07 15:50:37
 */

const pool = require("./mysql");

module.exports = {
    /**
     * @description: 注册用户
     * @param {Object} post
     */
    register: function(post) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                let sql = "INSERT INTO user SET ?";
                connection.query(sql, post, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                    connection.release(); //释放连接
                });
            });
        });
    }
};
