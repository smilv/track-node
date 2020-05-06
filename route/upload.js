/*
 * @Description: 文件上传-路由
 * @Autor: bin
 * @Date: 2020-02-26 16:10:12
 * @LastEditors: bin
 * @LastEditTime: 2020-05-06 17:55:13
 */

const express = require("express");
const router = express.Router();
const uploadController = require("../controllers/upload");
const upload = require("../lib/upload");

/**
 * imgFile 为一个以 imgFile 命名的文件
 */
router.post("/", upload.single("imgFile"), uploadController.upload);

module.exports = router;
