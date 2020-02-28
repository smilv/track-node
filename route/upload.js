/**
 * 文件上传-路由
 * bin 2020/02/26
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
