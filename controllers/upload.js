/*
 * @Description: 文件上传-控制器
 * @Autor: bin
 * @Date: 2020-02-26 16:43:06
 * @LastEditors: bin
 * @LastEditTime: 2020-06-05 17:26:37
 */

module.exports = {
    /**
     * 上传文件
     */
    upload: function(req, res) {
        res.json({
            code: 200,
            data: "/" + req.file.filename,
            msg: "success"
        });
    }
};
