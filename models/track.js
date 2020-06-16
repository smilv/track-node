/*
 * @Description: 埋点-模型
 * @Autor: bin
 * @Date: 2020-01-15 11:08:33
 * @LastEditors: bin
 * @LastEditTime: 2020-06-16 16:37:56
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
    },
    /**
     * 根据年份、位置获取统计量
     * @param {Object} post 数据
     */
    getCount: function(post) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                let sql = `SELECT COUNT(*) as pv,COUNT(DISTINCT user_id) as uv,COUNT(DISTINCT ip) as ip,MONTH(server_time) as month FROM track WHERE YEAR(server_time)=${post.year} AND position='${post.position}' GROUP BY MONTH(server_time)`;

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
