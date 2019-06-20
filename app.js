var express = require("express");
var bodyParser = require("body-parser"); //解析参数
var cors = require("cors");
var app = express();

// app.use(cors()); //cors跨域
app.use(bodyParser.json()); //json请求
app.use(bodyParser.urlencoded({ extended: false })); //表单请求

app.all("*", function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild");
    res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
    res.header("X-Powered-By", " 3.2.1");
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.post("/api/:type", function(req, res) {
    res.status(200);
    res.json({
        code: 200,
        result: [
            {
                name: "小张",
                age: 22
            },
            {
                name: "小李",
                age: 18
            }
        ],
        c: '["g4", "g1", "g15", "g2", "g3", "g6", "g5"]',
        query: req.query,
        params: req.params,
        json: req.body
    });
});

var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port);
});
