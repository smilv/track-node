/*
 * @Description: 用户-路由
 * @Autor: bin
 * @Date: 2019-06-28 14:26:01
 * @LastEditors: bin
 * @LastEditTime: 2020-05-06 17:55:26
 */

const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

router.post("/getAll", userController.getAll);

module.exports = router;
