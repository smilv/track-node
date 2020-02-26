/**文件上传
 * bin 2020/2/26
 */
const multer = require("multer");

const storage = multer.diskStorage({
    destination: "/uploads",
    filename: function(req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage: storage });

module.exports = upload;
