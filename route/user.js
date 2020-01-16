/**
 * 用户-路由
 * bin 2019/06/28
 */
const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

router.post("/getAll", userController.getAll);

module.exports = router;
