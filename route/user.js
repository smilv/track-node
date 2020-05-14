/*
 * @Description: 用户-路由
 * @Autor: bin
 * @Date: 2019-06-28 14:26:01
 * @LastEditors: bin
 * @LastEditTime: 2020-05-14 15:31:36
 */

const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

//登录
router.post("/login", userController.login);

//退出登录
router.post("/logout", userController.logout);

//注册
router.post("/register", userController.register);

//用户信息
router.post("/info", userController.info);

module.exports = router;
