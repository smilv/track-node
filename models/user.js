/*
 * @Description: 用户-模型
 * @Autor: bin
 * @Date: 2020-01-16 16:01:25
 * @LastEditors: bin
 * @LastEditTime: 2020-05-06 17:54:48
 */

const pool = require("./mysql");

module.exports = {
    getAll: function() {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                let sql = "SELECT * FROM user_test";
                connection.query(sql, (err, result) => {
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
