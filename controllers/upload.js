/*
 * @Description: 文件上传-控制器
 * @Autor: bin
 * @Date: 2020-02-26 16:43:06
 * @LastEditors: bin
 * @LastEditTime: 2020-06-09 15:20:03
 */

/**
 * 上传文件
 */
exports.upload = function(req, res) {
    let folder = req.body.folder + "/" || "";
    res.json({
        code: 200,
        data: "/" + folder + req.file.filename,
        msg: "success"
    });
};
