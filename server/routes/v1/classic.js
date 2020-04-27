const Router = require('koa-router');
const router = new Router({
    prefix: '/v1/classic'
});

const { Permission } = require('../../utils/permission');
const { Flow } = require('@models/FlowModel');
const { Favor } = require('@models/favorModel');
const {
    Movie,
    // Book,
    Music,
    Sentence
} = require('../../models/classicModel');
const { Community } = require('@models/communityModel');
const { CommonModel } = require('../../models/commonModel');
const { PublishValidator } = require('../../validators/validators');

/**
 * @description 获取首页全部数据的接口
 * Permission 对象，是验证接口的合法性和安全性
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


router.get('/favor', new Permission().isCorrectToken, async ctx => {
    const uid = ctx.auth.uid;
    ctx.body = await Favor.getMyClassicFavors(uid);
})

/**
 * @description 发布动态接口
 */
router.post('/publish', new Permission().isCorrectToken, async(ctx, next) => {
    const v = await new PublishValidator().validate(ctx);
    const title = v.get('body.title');
    const content = v.get('body.content');
    const author = v.get('body.author');
    const type = v.get('body.type');
    const filename = v.get('body.filename').match(/images(\S*)/)[0];
    const uid = ctx.auth.uid;
    let newClassic = null;
    let art = {
        title,
        content,
        image: filename,
        type,
        pubdate: Date.now()
    }
    // 创建记录
    if (type == 100) {
        newClassic = await Movie.create(art)
    } else {
        newClassic = await Sentence.create(art)
    }
    // 存记录到业务表Community
    const communityData = {
        art_id: newClassic.id,
        type: newClassic.type,
        uid,
    }
    await Community.create(communityData);



    
    
    ctx.body = true;

})


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