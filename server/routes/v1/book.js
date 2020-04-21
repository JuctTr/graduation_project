const Router = require('koa-router');
const router = new Router({
    prefix: '/v1/book'
});

const { HotBook } = require('@models/hotBookModel');
const { Book } = require('@models/bookModel');
const { Comment } = require('@models/bookComment');

const {
    PositiveIntegerValidator,
    SearchValidator,
    AddShortCommentValidator,
} = require('@validators/validators');

const { Permission } = require('@utils/permission');

 
router.get('/hot_list', async (ctx, next) => {
    const allBooks = await HotBook.getAll();
    ctx.body = allBooks;
});

router.get('/:id/detail', async ctx => {
    const v = await new PositiveIntegerValidator().validate(ctx)
    const book = new Book()
    ctx.body = await book.detail(v.get('path.id'))
})

router.get('/search', async ctx => {
    const v = await new SearchValidator().validate(ctx)
    const result = await Book.searchFromYuShu(
        v.get('query.q'), v.get('query.start'), v.get('query.count'))
    ctx.body = result
})

router.get('/favor/count', new Permission().isCorrectToken, async ctx => {
    const count = await Book.getMyFavorBookCount(ctx.auth.uid)
    ctx.body = {
        count
    }
})

router.get('/:book_id/favor', new Permission().isCorrectToken, async ctx => {
    const v =await new PositiveIntegerValidator().validate(ctx, {
        id: 'book_id'
    })
    const favor = await Favor.getBookFavor(
        ctx.auth.uid, v.get('path.book_id'))
    ctx.body = favor
})

router.post('/add/short_comment', new Permission().isCorrectToken, async ctx => {
    const v = await new AddShortCommentValidator().validate(ctx,{
        id:'book_id'
    })
    Comment.addComment(v.get('body.book_id'),v.get('body.content'))
    throw new global.errors.Success();
})

router.get('/:book_id/short_comment', new Permission().isCorrectToken, async ctx=>{
    const v = await new PositiveIntegerValidator().validate(ctx,{
        id:'book_id'
    })
    const book_id = v.get('path.book_id')
    const comments = await Comment.getComments(book_id)
    ctx.body = {
        comments,
        book_id
    }
})


router.get('/hot_keyword', async ctx => {
    ctx.body = {
        'hot': ['Python',
            '哈利·波特',
            '村上春树',
            '东野圭吾',
            '白夜行',
            '韩寒',
            '金庸',
            '王小波'
        ]
    }
})





module.exports = router;