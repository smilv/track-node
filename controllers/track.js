/**
 * 埋点-控制器
 * bin 2020/01/15
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
            res.status(400);
            res.json({
                code: 400,
                msg: "请求错误"
            });
            return;
        }
        trackModel.create(post).then(
            result => {
                res.status(200);
                res.json({
                    code: 200,
                    msg: "success"
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
                res.status(200);
                res.json({
                    code: 200,
                    data: data
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
            res.status(400);
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
                res.status(200);
                res.json({
                    code: 200,
                    data: result
                });
            },
            error => {
                console.log(error);
                res.status(500);
                res.json({
                    code: 500,
                    error: error
                });
            }
        );
    }
};
