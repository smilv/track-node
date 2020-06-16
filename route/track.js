/*
 * @Description: 埋点-路由
 * @Autor: bin
 * @Date: 2020-01-06 10:47:12
 * @LastEditors: bin
 * @LastEditTime: 2020-06-16 16:32:30
 */

const express = require("express");
const router = express.Router();
const trackController = require("../controllers/track");

//写入埋点记录
router.post("/create", trackController.create);

//获取所有数据
router.post("/getAll", trackController.getAll);

//根据年份、位置获取统计量
router.post("/getCount", trackController.getCount);

module.exports = router;
