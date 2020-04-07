const Router = require('koa-router');
const router = new Router({
    prefix: '/v1/classic'
});

const { Permission } = require('../../utils/permission');
const { Flow } = require('@models/FlowModel');
const {
    Movie,
    // Book,
    Music,
    Sentence
} = require('../../models/classicModel');
const { CommonModel } = require('../../models/commonModel');

/**
 * @description 获取首页全部数据的接口
 */
router.get('/all', new Permission().isCorrectToken, async (ctx, next) => {
    /**
     * @returns {Array} [{ id: 1, index: 1, art_id: 3}, {...}, {...}]
     */
    const allClassicIds = await Flow.findAll({
        order: ['index']
    });
    const allIndexData = await CommonModel.getAllIndexData(allClassicIds);
    
    ctx.body = allIndexData;
})

/**
 * 请求最新一期的数据
 */
router.get('/latest', new Permission().isCorrectToken, async (ctx, next) => {
    
    const latestData = await Flow.findOne({
        order: [
            ['index', 'DESC'] // 对数据库中的Flow实体表中数据进行排序，把期刊号最大的一期，返回给前端
        ]
    });

    const commonData = await CommonModel.getData(latestData.art_id, latestData.type);
    commonData.setDataValue('index', latestData.index); // 把Flow实体表中的期刊号index，setDataValue方法是sequelize中的方法
    ctx.body = commonData;
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