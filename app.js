/**
 * 主入口文件
 * bin 2019/06/10
 */
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const winston = require("winston");
const expressWinston = require("express-winston");
const isOriginAllowed = require("./config/is-origin-allowed");
const route = require("./route");
const app = express();

/**
 * cors 跨域
 */
app.all("*", function(req, res, next) {
    res.header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild");
    res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
    res.header("X-Powered-By", " 3.2.1");
    res.header("Content-Type", "application/json;charset=utf-8");
    if (isOriginAllowed(req.headers.origin)) {
        res.header("Access-Control-Allow-Origin", req.headers.origin);
        res.header("Access-Control-Allow-Credentials", "true");
        next();
    } else {
        res.status(403);
        res.send({ msg: "非法请求" });
        res.end();
    }
});

app.set("trust proxy", true); // 设置以后，req.ips是ip数组；如果未经过代理，则为[]. 若不设置，则req.ips恒为[]

app.use(cookieParser()); //操作cookie
app.use(bodyParser.json()); //json请求
app.use(bodyParser.urlencoded({ extended: false })); //表单请求

app.use(morgan("short")); //控制台日志

// 正常请求的日志
app.use(
    expressWinston.logger({
        transports: [
            // new winston.transports.Console(),
            new winston.transports.File({
                filename: "logs/success.log"
            })
        ],
        format: winston.format.combine(winston.format.colorize(), winston.format.json())
    })
);

//路由
route(app);

// 错误请求的日志
app.use(
    expressWinston.errorLogger({
        transports: [
            new winston.transports.Console(),
            new winston.transports.File({
                filename: "logs/error.log"
            })
        ],
        format: winston.format.combine(winston.format.colorize(), winston.format.json())
    })
);

//捕获错误
app.use(function(err, req, res, next) {
    res.status(500);
    res.json(err.toString());
});

const server = app.listen(3000, function() {
    const host = server.address().address;
    const port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port);
});
