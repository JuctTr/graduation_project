const router = require('../index');
const { Permission } = require('../../utils/permission');

router.get('/v1/classic/lastest', new Permission().isCorrectToken, (ctx, next) => {
    ctx.body = ctx.auth;

});


/*
    如何在koa中传递参数？
    第一：就是在路径的中间携带参数，比如: '/v1/{param}/classic/lastest'，'/v1/:id/classic/lastest'
    第二：就是在？后面携带参数，比如：'/v1/classic/lastest?name=yicong&id=1001'
*/ 
router.post('/v1/:id/classic/lastest', async (ctx, next) => {
    // 这里要做参数校验，避免有一些不合法的参数，存入数据库
    // console.log(ctx.params, ctx.request.query, ctx.request.header, ctx.request.body)
    ctx.body = { 
        key: 'classic',
        ctx: ctx,
        params: ctx.params,
        query: ctx.request.query,
        header: ctx.request.header,
        body: ctx.request.body,
    }
});



module.exports = router;