const Router = require('koa-router');
const router = new Router({
    prefix: '/v1/book'
});

const { HotBook } = require('../../models/hotBookModel');

 
router.get('/hot_list', async (ctx, next) => {
    // ctx.body = { key: 'book' }
    // console.log('进来book了')
    const v = await HotBook.getAll();
    

});





module.exports = router;