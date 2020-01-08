var express = require("express");
var bodyParser = require("body-parser"); //解析参数
var cookieParser = require("cookie-parser");
var mysql = require("mysql");
var mysqlConfig = require("./config/mysql.config");
var app = express();
var router = express.Router();

app.use(cookieParser());
app.use(bodyParser.json()); //json请求
app.use(bodyParser.urlencoded({ extended: false })); //表单请求

var pool;
reconn();

function reconn() {
    pool = mysql.createPool(mysqlConfig); //创立连接池
    pool.on("error", err => err.code === "PROTOCOL_CONNECTION_LOST" && setTimeout(reconn, 2000));
}

module.exports = { pool, router, app };
