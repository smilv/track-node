/*
 * @Description: mysql连接
 * @Autor: bin
 * @Date: 2020-01-09 19:08:09
 * @LastEditors: bin
 * @LastEditTime: 2020-05-06 17:54:32
 */

const mysql = require("mysql");
const mysqlConfig = require("../config/mysql.config");

let pool;
reconn();
function reconn() {
    pool = mysql.createPool(mysqlConfig); //创立连接池
    pool.on("error", err => err.code === "PROTOCOL_CONNECTION_LOST" && setTimeout(reconn, 2000));
}

module.exports = pool;
