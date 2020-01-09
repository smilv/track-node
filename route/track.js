// bin 2020/01/06
var { router, pool } = require("../connect");
var useragent = require("useragent");

//埋点
router.post("/create", function(req, res) {
    // 从连接池中拿一个连接
    pool.getConnection((err, connection) => {
        let sql = "INSERT INTO track SET ?";
        let agent = useragent.parse(req.headers["user-agent"]).toString();
        let post = {
            position: req.body.position,
            user_mobile: req.body.userMobile,
            user_id: req.body.userId,
            server_time: new Date().toLocaleString(),
            platform: agent
        };
        connection.query(sql, post, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.status(200);
                res.json({
                    code: 200,
                    data: "success"
                });
            }
        });
        pool.releaseConnection(connection); //释放连接
    });
});

//获取所有数据
router.post("/getAll", function(req, res) {
    pool.getConnection((err, connection) => {
        let sql = "SELECT * FROM track";
        connection.query(sql, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                let data = [];
                result.forEach(element => {
                    data.push({
                        id: element.id,
                        position: element.position,
                        time: element.server_time,
                        userMobile: element.user_mobile,
                        userId: element.user_id,
                        platform: element.platform
                    });
                });
                res.status(200);
                res.json({
                    code: 200,
                    data: data
                });
            }
        });
        pool.releaseConnection(connection);
    });
});

module.exports = router;
