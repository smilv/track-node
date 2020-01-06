// bin 2020/01/06
var { router, pool } = require("../connect");

router.post("/", function(req, res) {
    // 从连接池中拿一个连接
    pool.getConnection((err, connection) => {
        let sql = "INSERT INTO track SET ?";
        let post = { ...req.body, server_time: new Date() };
        connection.query(sql, post, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                connection.query("SELECT * FROM track", (err, result) => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.status(200);
                        res.json({
                            code: 200,
                            data: result
                        });
                    }
                });
            }
        });

        pool.releaseConnection(connection); //释放连接
    });
});

module.exports = router;
