/*
 * @Description: 用户-控制器
 * @Autor: bin
 * @Date: 2020-01-16 16:00:54
 * @LastEditors: bin
 * @LastEditTime: 2020-05-07 18:53:59
 */
const userModel = require("../models/user");
const regex = require("../lib/regex");

module.exports = {
    /**
     * 注册
     */
    register: function(req, res) {
        let post = {
            mobile: req.body.mobile,
            password: req.body.password,
            regtime: new Date().toLocaleString()
        };
        let error = null;
        // 未传参也按格式不正确处理
        if (!post.mobile || !regex.mobile.test(post.mobile)) {
            error = {
                code: 5002,
                msg: "手机号格式不正确"
            };
        } else if (!post.password || !regex.password.test(post.password)) {
            error = {
                code: 5003,
                msg: "密码格式不正确"
            };
        }
        if (error) {
            res.status(400);
            res.json({
                code: error.code,
                msg: error.msg
            });
            return;
        }
        userModel.register(post).then(
            result => {
                res.status(200);
                res.json({
                    code: 200,
                    msg: "success"
                });
            },
            error => {
                let result = error;
                let code = 500;
                let status = 500;
                //手机号已存在
                if (error.errno == 1062) {
                    code = 5001;
                    result = "用户已存在";
                    status = 400;
                }
                res.status(status);
                res.json({
                    code: code,
                    error: result
                });
            }
        );
    }
};
