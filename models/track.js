/**
 * 埋点-模型
 * bin 2020/01/15
 */

const pool = require("./mysql");

module.exports = {
    /**
     * 写入埋点记录
     * @param {Object} post 数据
     */
    create: function(post) {
        return new Promise((resolve, reject) => {
            // 从连接池中拿一个连接
            pool.getConnection((err, connection) => {
                let sql = "INSERT INTO track SET ?";
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
     * 获取所有埋点记录
     */
    getAll: function() {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                let sql = "SELECT * FROM track";
                connection.query(sql, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                    connection.release();
                });
            });
        });
    }
};
