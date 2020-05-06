/*
 * @Description: 用户-控制器
 * @Autor: bin
 * @Date: 2020-01-16 16:00:54
 * @LastEditors: bin
 * @LastEditTime: 2020-05-06 17:54:06
 */
const userModel = require("../models/user");

module.exports = {
    /**
     * 获取所有用户
     */
    getAll: function(req, res) {
        userModel.getAll().then(
            result => {
                res.status(200);
                res.json({
                    code: 200,
                    data: result,
                    c: '["g4", "g1", "g15", "g2", "g3", "g6", "g5"]',
                    query: req.query,
                    params: req.params,
                    json: req.body
                });
            },
            error => {
                res.status(500);
                res.json({
                    code: 500,
                    error: error
                });
            }
        );
    }
};
