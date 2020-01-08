var { app } = require("./connect");
var isOriginAllowed = require("./config/is-origin-allowed");
var user = require("./route/user");
var track = require("./route/track");

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

app.use("/user", user);
app.use("/track", track);

var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port);
});
