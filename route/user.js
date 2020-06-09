/*
 * @Description: 用户-路由
 * @Autor: bin
 * @Date: 2019-06-28 14:26:01
 * @LastEditors: bin
 * @LastEditTime: 2020-06-09 15:17:46
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

//更新用户信息
router.post("/update", userController.update);

module.exports = router;
