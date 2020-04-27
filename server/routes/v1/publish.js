const Router = require('koa-router');


const router = new Router({
    prefix: '/v1/publish'
});
// const { PublishValidator } = require('../../validators/validators');
const { Permission } = require('../../utils/permission');



const multer = require('koa-multer');

var storage = multer.diskStorage({
    //文件保存路径
    destination: function (req, file, callback) {
        callback(null, 'static/images/')
    },
    //修改文件名称
    filename: function (req, file, callback) {
        var fileFormat = (file.originalname).split(".");
        callback(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
})
var upload = multer({ storage: storage })

router.post('/uploadFile', new Permission().isCorrectToken, upload.single('file'), async (ctx, next) => {

    const body = ctx.req.body;
    const {
        title,
        content,
        author,
    } = body;

    ctx.body = {
        filename: global.config.host + 'images/' + ctx.req.file.filename //返回在static/images中的文件名
    }
})

module.exports = router;