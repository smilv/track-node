var express = require("express");
var bodyParser = require("body-parser"); //解析参数
var cors = require("cors");
var mysql = require("mysql");
var app = express();
var router = express.Router();

var options = {
    host: "localhost",
    user: "root",
    password: "123456",
    port: "3306",
    database: "bin",
    connectTimeout: 5000, //链接超时
    multipleStatements: false, //是否允许一个query中包含多条sql语句
    waitForConnectinos: true, //当无连接池可用时，等待(true)还是抛错(false)
    connectionLimit: 100, //连接数限制
    queueLimit: 0 //最大连接等待数(0不限制)
};

// app.use(cors()); //cors跨域
app.use(bodyParser.json()); //json请求
app.use(bodyParser.urlencoded({ extended: false })); //表单请求

var pool;
reconn();

function reconn() {
    pool = mysql.createPool(options); //创立连接池
    pool.on("error", err => err.code === "PROTOCOL_CONNECTION_LOST" && setTimeout(reconn, 2000));
}

module.exports = { pool, router, app };
