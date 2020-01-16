/**
 * 路由模块分发
 * bin 2020/01/16
 */

const user = require("./user"); //用户
const track = require("./track"); //埋点

module.exports = function(app) {
    app.use("/user", user);
    app.use("/track", track);
};
