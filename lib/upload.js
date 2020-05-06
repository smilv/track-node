/*
 * @Description: 文件上传
 * @Autor: bin
 * @Date: 2020-02-26 16:38:26
 * @LastEditors: bin
 * @LastEditTime: 2020-05-06 17:54:14
 */

const multer = require("multer");

const upload = multer({
    storage: multer.diskStorage({
        destination: "/uploads", //本地保存的目录
        filename: function(req, file, cb) {
            //保存的文件名
            cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
        }
    }),
    //限制上传大小5M和同时上传的数量
    limits: {
        fileSize: 1024 * 1024 * 5,
        files: 5
    },
    //依据mime文件类型过滤
    fileFilter: function(req, file, cb) {
        const allowArr = ["image/jpeg", "image/gif", "image/png"];
        if (allowArr.indexOf(file.mimetype) > -1) {
            cb(null, true);
        } else {
            cb(new Error("文件类型不正确"));
        }
    }
});

module.exports = upload;
