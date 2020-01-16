/**
 * 用户-模型
 * bin 2020/01/16
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
