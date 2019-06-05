const Router = require('koa-router');

const router = new Router();

const user = require('./user');

const { keepLogin, checkLogin } = require('../middleware/login');

router.get('/', keepLogin, async ctx => {
    console.log('session:', ctx.session);
    ctx.body = await ctx.render('index', { session: ctx.session, title: '博客首页' });
});

router.use('/user', user.routes()).use(user.allowedMethods());

module.exports = router;