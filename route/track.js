/**
 * 埋点-路由
 * bin 2020/01/06
 */
const express = require("express");
const router = express.Router();
const trackController = require("../controllers/track");

//写入埋点记录
router.post("/create", trackController.create);

//获取所有数据
router.post("/getAll", trackController.getAll);

//根据年份获取统计量
router.post("/getCount", trackController.getCount);

module.exports = router;
