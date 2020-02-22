var router = require('../index');
 
router.get('/v1/book/lastest', (ctx, next) => {
    ctx.body = { key: 'book' }
    console.log('进来book了')
});





module.exports = router;