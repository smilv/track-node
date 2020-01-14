// bin 2019/06/26
const express = require("express");
const bodyParser = require("body-parser"); //解析参数
const cookieParser = require("cookie-parser");
const mysql = require("mysql");
const mysqlConfig = require("./config/mysql.config");
const app = express();
const router = express.Router();

app.use(cookieParser());
app.use(bodyParser.json()); //json请求
app.use(bodyParser.urlencoded({ extended: false })); //表单请求

let pool;
reconn();

function reconn() {
    pool = mysql.createPool(mysqlConfig); //创立连接池
    pool.on("error", err => err.code === "PROTOCOL_CONNECTION_LOST" && setTimeout(reconn, 2000));
}

module.exports = { pool, router, app };
