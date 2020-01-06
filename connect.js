var express = require("express");
var bodyParser = require("body-parser"); //解析参数
var cors = require("cors");
var mysql = require("mysql");
var app = express();
var router = express.Router();
var mysqlConfig = require("./config/mysql.config");

app.use(bodyParser.json()); //json请求
app.use(bodyParser.urlencoded({ extended: false })); //表单请求

var pool;
reconn();

function reconn() {
    pool = mysql.createPool(mysqlConfig); //创立连接池
    pool.on("error", err => err.code === "PROTOCOL_CONNECTION_LOST" && setTimeout(reconn, 2000));
}

module.exports = { pool, router, app };
