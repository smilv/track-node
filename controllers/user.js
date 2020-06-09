/*
 * @Description: 用户-控制器
 * @Autor: bin
 * @Date: 2020-01-16 16:00:54
 * @LastEditors: bin
 * @LastEditTime: 2020-06-09 15:36:51
 */
const userModel = require("../models/user");
const regex = require("../lib/regex");
const Identicon = require("identicon.js");
const fs = require("fs");
const utils = require("../lib/utils");
const moment = require("moment");

/**
 * @description: 登录
 */
exports.login = function(req, res) {
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
        res.json({
            code: error.code,
            msg: error.msg
        });
        return;
    }
    // 根据手机号查找用户
    userModel.findUser({ key: "mobile", value: body.mobile }).then(result => {
        if (result.length > 0) {
            if (result[0].password == body.password) {
                req.session.user = result[0];
                res.json({
                    code: 200
                });
            } else {
                res.json({
                    code: 5005,
                    msg: "密码错误"
                });
            }
        } else {
            res.json({
                code: 5004,
                msg: "用户不存在"
            });
        }
    });
};

/**
 * @description: 退出登录
 */
exports.logout = function(req, res) {
    let code = 200;
    let msg = "退出成功";
    req.session.destroy(function(err) {
        if (err) {
            code = 400;
            msg = "退出失败!";
        }
        res.json({
            code,
            msg
        });
    });
};

/**
 * @description: 注册
 */
exports.register = function(req, res) {
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
        username: body.mobile,
        avatar: "/avatar/" + Date.now() + ".png"
    };
    userModel.register(post).then(
        result => {
            //保存默认头像
            let base64 = new Identicon(utils.md5(post.mobile), 128).toString();
            let base64Buffer = new Buffer(base64, "base64");
            //avatar文件夹不存在，创建一个
            if (!fs.existsSync("/uploads/avatar")) {
                fs.mkdirSync("/uploads/avatar");
            }
            fs.writeFile("/uploads" + post.avatar, base64Buffer, err => {
                if (err) throw err;
            });
            res.json({
                code: 200,
                msg: "success"
            });
        },
        error => {
            let result = error;
            let code = 500;
            //手机号已存在
            if (error.errno == 1062) {
                code = 5001;
                result = "用户已存在";
            }
            res.json({
                code: code,
                error: result
            });
        }
    );
};

/**
 * @description: 获取用户信息
 */
exports.info = function(req, res) {
    let user = req.session.user;
    if (user) {
        userModel.findUser({ key: "id", value: user.id }).then(result => {
            let user = result[0];
            req.session.user = user;
            res.json({
                code: 200,
                data: {
                    id: user.id,
                    mobile: user.mobile,
                    username: user.username,
                    avatar: user.avatar,
                    birthday: user.birthday
                }
            });
        });
    } else {
        res.json({
            code: 400,
            msg: "用户未登录"
        });
    }
};

/**
 * @description: 更新用户信息
 */
exports.update = function(req, res) {
    let user = req.session.user;
    let body = req.body;
    let post = {
        avatar: body.avatar,
        username: body.username,
        birthday: body.birthday ? moment(body.birthday).format("YYYY-MM-DD") : null
    };
    if (!user) {
        res.json({
            code: 400,
            msg: "用户未登录"
        });
        return;
    }
    userModel.update(post, user.id).then(
        result => {
            exports.info(req, res);
        },
        error => {
            res.json({
                code: 500,
                error
            });
        }
    );
};
