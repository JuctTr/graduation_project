const Router = require('koa-router');
const router = new Router({
    prefix: '/v1/like'
});
const { Permission } = require('../../utils/permission');
const { LikeValidator } = require('../../validators/validators');
const { Favor } = require('@models/favorModel');

router.post('/', new Permission().isCorrectToken, async (ctx, next) => {
    const v = await new LikeValidator().validate(ctx,{
        id: 'art_id'
    });

    const art_id = v.get('body.art_id');
    const type = v.get('body.type');

    await Favor.like(art_id, type, ctx.auth.uid);
    
    throw new global.errors.Success();
})

router.post('/cancel', new Permission().isCorrectToken, async ctx => {
    const v = await new LikeValidator().validate(ctx,{
        id:'art_id'
    });

    const art_id = v.get('body.art_id');
    const type = v.get('body.type');

    await Favor.dislike(art_id, type, ctx.auth.uid);

    throw new global.errors.Success();
})


module.exports = router;