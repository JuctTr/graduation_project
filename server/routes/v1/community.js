const Router = require('koa-router');
const router = new Router({
    prefix: '/v1/community'
});
const { Permission } = require('../../utils/permission');
const { Community } = require('@models/communityModel');
const { CommonModel } = require('@models/commonModel');

router.get('/', new Permission().isCorrectToken, async (ctx, next) => {

    const artIdArray = await Community.findAll({
        order: ['id']
    });
    const communityData = await Community.getAllIndexData(artIdArray);

    console.log(communityData);
    // throw new global.errors.Success();
    ctx.body = communityData;
})

module.exports = router;