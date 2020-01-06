var { app } = require("./connect");
var user = require("./route/user");
var track = require("./route/track");

app.all("*", function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild");
    res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
    res.header("X-Powered-By", " 3.2.1");
    res.header("Content-Type", "application/json;charset=utf-8");
    // if (req.query.login == 0) {
    //     return res.json({
    //         code: 10000,
    //         data: "未登录"
    //     });
    // }
    next();
});

app.use("/user", user);
app.use("/track", track);

var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port);
});
