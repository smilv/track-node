/*
 * @Description: 用户-控制器
 * @Autor: bin
 * @Date: 2020-01-16 16:00:54
 * @LastEditors: bin
 * @LastEditTime: 2020-05-11 17:13:45
 */
const userModel = require("../models/user");
const regex = require("../lib/regex");
const Identicon = require("identicon.js");
const fs = require("fs");
const utils = require("../lib/utils");

module.exports = {
    /**
     * 注册
     */
    register: function(req, res) {
        let body = req.body;
        let error = null;
        // 未传参也按格式不正确处理
        if (!body.mobile || !regex.mobile.test(body.mobile)) {
            error = {
                code: 5002,
                msg: "手机号格式不正确"
            };
        } else if (!body.password || !regex.password.test(body.password)) {
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

        let post = {
            mobile: body.mobile,
            password: body.password,
            regtime: new Date().toLocaleString(),
            avatar: "/avatar/" + Date.now() + ".png"
        };
        userModel.register(post).then(
            result => {
                //保存默认头像
                let base64 = new Identicon(utils.md5(post.mobile), 420).toString();
                let base64Buffer = new Buffer(base64, "base64");
                //avatar文件夹不存在，创建一个
                if (!fs.existsSync("/uploads/avatar")) {
                    fs.mkdirSync("/uploads/avatar");
                }
                fs.writeFile("/uploads" + post.avatar, base64Buffer, err => {
                    if (err) throw err;
                });
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
