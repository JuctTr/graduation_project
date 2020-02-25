const Router = require('koa-router');
const router = new Router({
    prefix: '/v1/user' // 前缀功能，在每一个请求路径前面加
});

// 注册校检
const { RegisterValidator } = require('../../validators/validators');

// 用户model层，一般用来操作数据库的
const { User } = require('../../models/userModel');

router.post('/register', async (ctx) => {
    const v = await new RegisterValidator().validate(ctx);
    const user = {
        nickname: v.get('body.nickname'),
        password: v.get('body.confirmPassword'),
        email: v.get('body.email')
    }

    const r = await User.create(user);
   
})


module.exports = router

