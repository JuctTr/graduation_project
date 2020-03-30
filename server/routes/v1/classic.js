const Router = require('koa-router');
const router = new Router({
    prefix: '/v1/classic'
});

const { Permission } = require('../../utils/permission');
const { Flow } = require('../../models/FlowModel');
const {
    Movie,
    // Book,
    // Music
} = require('../../models/classicModel');

/**
 * 请求最新一期的数据
 */
router.get('/lastest', new Permission().isCorrectToken, async (ctx, next) => {
    // 对数据库中的数据进行排序，把期刊号最大的一期，返回给前端
    const lastestData = await Flow.findOne({
        order: [
            ['index', 'DESC']
        ]
    });
    ctx.body = lastestData;


});

/**
 * 请求下一期的数据
 */
router.get('/:index/next', new Permission().isCorrectToken, (ctx, next) => {
    ctx.body = ctx.auth;

});

/**
 * 请求上一期的数据
 */
router.get('/:index/previous', new Permission().isCorrectToken, (ctx, next) => {
    ctx.body = ctx.auth;

});

// router.get('/lastest', new Permission().isCorrectToken, (ctx, next) => {
//     ctx.body = ctx.auth;

// });




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