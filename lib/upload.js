/**文件上传
 * bin 2020/2/26
 */
const multer = require("multer");

const upload = multer({
    storage: multer.diskStorage({
        destination: "/uploads",
        filename: function(req, file, cb) {
            cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
        }
    }),
    limits: {
        fileSize: 1024 * 1024 * 5,
        files: 5
    },
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
