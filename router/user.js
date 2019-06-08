const userRouter = require('koa-router')();

const { userLog, userReg, logout, userCenter } = require('../controller/user');

const { myArticles } = require('../controller/article');

const { commentList } = require('../controller/comment');

const { keepLogin, checkLogin } = require('../middleware/login');

//登陆注册页面
userRouter.get(/(reg|log)/, async ctx => {
    console.log(ctx.path);
    const isreg = /reg$/.test(ctx.path);
    ctx.body = await ctx.render('reglog', { isreg, title: '登陆注册' });
})



userRouter.post('/reg', userReg)

userRouter.post('/log', userLog)

userRouter.get('/logout', logout)

userRouter.get('/my/:id', checkLogin, userCenter)


// 获取用户的所有文章
userRouter.get("/articles", keepLogin, myArticles);

// 获取用户的所有评论
userRouter.get("/comments", keepLogin, commentList);



module.exports = userRouter;

//