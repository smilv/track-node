/**
 * mysql连接
 * bin 2019/06/26
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
