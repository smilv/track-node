/*
 * @Description: 埋点-控制器
 * @Autor: bin
 * @Date: 2020-01-15 11:06:16
 * @LastEditors: bin
 * @LastEditTime: 2020-05-18 20:25:21
 */

const useragent = require("useragent");
const trackModel = require("../models/track");
const utils = require("../lib/utils");

module.exports = {
    /**
     * 写入埋点记录
     */
    create: function(req, res) {
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
    },
    /**
     * 获取所有埋点记录
     */
    getAll: function(req, res) {
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
    },
    /**
     * 根据年份获取统计量
     */
    getCount: function(req, res) {
        let post = {
            year: req.body.year
        };
        /**
         * year必传
         */
        if (!post.year) {
            res.json({
                code: 400,
                msg: "请求错误"
            });
            return;
        }
        trackModel.getCount(post).then(
            result => {
                //月份不足一年，补全其余月份
                let resLen = result.length;
                for (let i = resLen + 1; i <= 12; i++) {
                    result.push({ month: i });
                }
                result.map(item => (item.month += "月"));
                res.json({
                    code: 200,
                    data: result
                });
            },
            error => {
                res.json({
                    code: 500,
                    error: error
                });
            }
        );
    }
};
