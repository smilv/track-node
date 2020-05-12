/*
 * @Description: 用户-路由
 * @Autor: bin
 * @Date: 2019-06-28 14:26:01
 * @LastEditors: bin
 * @LastEditTime: 2020-05-12 17:17:46
 */

const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

//登录
router.post("/login", userController.login);

//注册
router.post("/register", userController.register);

module.exports = router;
