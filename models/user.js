/*
 * @Description: 用户-模型
 * @Autor: bin
 * @Date: 2020-01-16 16:01:25
 * @LastEditors: bin
 * @LastEditTime: 2020-06-30 18:50:48
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
                let sql = `SELECT * FROM user WHERE ${post.key}=${post.value}`;
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
    },
    /**
     * @description: 更新用户昵称、生日信息
     * @param {Object} post
     * @param {Number} userId 用户id
     */
    update: function(post, userId) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                let sql;
                if (post.birthday) {
                    sql = `UPDATE user SET avatar='${post.avatar}', username='${post.username}', birthday='${post.birthday}' WHERE id=${userId}`;
                } else {
                    sql = `UPDATE user SET avatar='${post.avatar}', username='${post.username}', birthday=null WHERE id=${userId}`;
                }
                // let sql = `UPDATE user SET avatar='${post.avatar}', username='${post.username}', birthday=${post.birthday ? `'${post.birthday}'` : null} WHERE id=${userId}`;

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
