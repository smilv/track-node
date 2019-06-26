var express = require("express");
var bodyParser = require("body-parser"); //解析参数
var cors = require("cors");
var mysql = require("mysql");
var app = express();
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

app.all("*", function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild");
    res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
    res.header("X-Powered-By", " 3.2.1");
    res.header("Content-Type", "application/json;charset=utf-8");
    if (req.query.login == 0) {
        return res.json({
            code: 10000,
            data: "未登录"
        });
    }
    next();
});

app.post("/api/demo/:type", function(req, res) {
    //直接使用
    // pool.query("SELECT * FROM user", (e, r) => {
    //     res.status(200);
    //     res.json({
    //         code: 200,
    //         data: r,
    //         c: '["g4", "g1", "g15", "g2", "g3", "g6", "g5"]',
    //         query: req.query,
    //         params: req.params,
    //         json: req.body
    //     });
    // });

    // 从连接池中拿一个连接
    pool.getConnection((err, conn) => {
        conn.query("SELECT * FROM user", (e, r) => {
            res.status(200);
            res.json({
                code: 200,
                data: r,
                c: '["g4", "g1", "g15", "g2", "g3", "g6", "g5"]',
                query: req.query,
                params: req.params,
                json: req.body
            });
        });
        conn.release();
    });
});

var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port);
});

function reconn() {
    pool = mysql.createPool(options); //创立连接池
    pool.on("error", err => err.code === "PROTOCOL_CONNECTION_LOST" && setTimeout(reconn, 2000));
}
