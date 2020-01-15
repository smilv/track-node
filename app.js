/**
 * 主入口文件
 * bin 2019/06/10
 */
const { app } = require("./connect");
const isOriginAllowed = require("./config/is-origin-allowed");
const morgan = require("morgan");
const winston = require("winston");
const expressWinston = require("express-winston");
const user = require("./route/user");
const track = require("./route/track");

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
app.use(morgan("short")); //控制台日志

// 正常请求的日志
app.use(
    expressWinston.logger({
        transports: [
            // new winston.transports.Console(),
            new winston.transports.File({
                filename: "log/success.log"
            })
        ],
        format: winston.format.combine(winston.format.colorize(), winston.format.json())
    })
);

app.use("/user", user);
app.use("/track", track);

// 错误请求的日志
app.use(
    expressWinston.errorLogger({
        transports: [
            new winston.transports.Console(),
            new winston.transports.File({
                filename: "log/error.log"
            })
        ],
        format: winston.format.combine(winston.format.colorize(), winston.format.json())
    })
);

const server = app.listen(3000, function() {
    const host = server.address().address;
    const port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port);
});
