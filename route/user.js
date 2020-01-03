var { router, pool } = require("../connect");

router.post("/demo/:type", function(req, res) {
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
    pool.getConnection((err, connection) => {
        connection.query("SELECT * FROM user_test", (e, r) => {
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
        pool.releaseConnection(connection); //释放连接
    });
});

module.exports = router;
