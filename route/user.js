/*
 * @Description: 用户-路由
 * @Autor: bin
 * @Date: 2019-06-28 14:26:01
 * @LastEditors: bin
 * @LastEditTime: 2020-05-07 15:46:58
 */

const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

//注册
router.post("/register", userController.register);

module.exports = router;
