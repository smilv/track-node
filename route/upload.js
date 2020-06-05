/*
 * @Description: 文件上传-路由
 * @Autor: bin
 * @Date: 2020-02-26 16:10:12
 * @LastEditors: bin
 * @LastEditTime: 2020-06-05 17:33:04
 */

const express = require("express");
const router = express.Router();
const uploadController = require("../controllers/upload");
const upload = require("../lib/upload");

/**
 * file 为一个以 file 命名的文件
 */
router.post("/", upload.single("file"), uploadController.upload);

module.exports = router;
