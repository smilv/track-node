/*
 * @Description: 用户-模型
 * @Autor: bin
 * @Date: 2020-01-16 16:01:25
 * @LastEditors: bin
 * @LastEditTime: 2020-05-13 17:21:48
 */

const pool = require("./mysql");

module.exports = {
    /**
     * @description: 根据key获取用户信息
     * @param {Object} post
     */
    findUser: function(post) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                let sql = `SELECT * FROM user WHERE ${post.key}='${post.value}'`;
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
    },
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
