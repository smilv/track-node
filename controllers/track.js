/*
 * @Description: 埋点-控制器
 * @Autor: bin
 * @Date: 2020-01-15 11:06:16
 * @LastEditors: bin
 * @LastEditTime: 2020-06-16 17:33:01
 */

const useragent = require("useragent");
const trackModel = require("../models/track");
const utils = require("../lib/utils");

/**
 * 写入埋点记录
 */
exports.create = function(req, res) {
    let agent = useragent.parse(req.headers["user-agent"]).toString();
    let post = {
        position: req.body.position,
        user_mobile: req.body.userMobile,
        user_id: req.body.userId,
        server_time: new Date().toLocaleString(),
        platform: agent,
        ip: req.ip
    };
    /**
     * position 不能为空
     */
    if (!post.position || utils.trim(post.position) == "") {
        res.json({
            code: 400,
            msg: "请求错误"
        });
        return;
    }
    trackModel.create(post).then(
        result => {
            res.json({
                code: 200,
                msg: "success"
            });
        },
        error => {
            res.json({
                code: 500,
                error: error
            });
        }
    );
};

/**
 * 获取所有埋点记录
 */
exports.getAll = function(req, res) {
    trackModel.getAll().then(
        result => {
            let data = [];
            /**
             * 转化数据库字段
             */
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
            res.json({
                code: 200,
                data: data
            });
        },
        error => {
            res.json({
                code: 500,
                error: error
            });
        }
    );
};

/**
 * 根据年份、位置获取统计量
 */
exports.getCount = function(req, res) {
    let body = req.body;
    let post = {
        year: body.year,
        position: body.position
    };
    if (!post.year || !post.position) {
        res.json({
            code: 400,
            msg: "请求错误"
        });
        return;
    }
    trackModel.getCount(post).then(
        result => {
            //补全其余月份
            let data = [];
            if (result.length < 12) {
                for (let i = 1; i <= 12; i++) {
                    let shift = result[0];
                    let obj = { month: i };
                    if (shift && shift.month == i) {
                        obj = shift;
                        result.shift();
                    }
                    data.push(obj);
                }
            } else {
                data = result;
            }
            data.map(item => (item.month += "月"));
            res.json({
                code: 200,
                data: data
            });
        },
        error => {
            res.json({
                code: 500,
                error: error
            });
        }
    );
};
