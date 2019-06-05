const userRouter = require('koa-router')();

const { userLog, userReg ,logout} = require('../controller/user');

//登陆注册页面
userRouter.get(/(reg|log)/, async ctx => {
    console.log(ctx.path);
    const isreg = /reg$/.test(ctx.path);
    ctx.body = await ctx.render('reglog', { isreg ,title:'登陆注册'});
})



userRouter.post('/reg', userReg)

userRouter.post('/log', userLog)

userRouter.get('/logout', logout)



module.exports = userRouter;

//