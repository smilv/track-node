/**
 * 埋点-路由
 * bin 2020/01/06
 */
const { router } = require("../connect");
const trackController = require("../controllers/track");

//写入埋点记录
router.post("/create", trackController.create);

//获取所有数据
router.post("/getAll", trackController.getAll);

module.exports = router;
