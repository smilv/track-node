/*
 * @Description: 路由模块分发
 * @Autor: bin
 * @Date: 2020-01-16 16:25:18
 * @LastEditors: bin
 * @LastEditTime: 2020-05-06 17:54:57
 */

const user = require("./user"); //用户
const track = require("./track"); //埋点
const upload = require("./upload"); //文件上传

module.exports = function(app) {
    app.use("/user", user);
    app.use("/track", track);
    app.use("/upload", upload);
};
