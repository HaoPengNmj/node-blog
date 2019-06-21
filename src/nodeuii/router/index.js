const Router = require('koa-router');

const router = new Router();

const user = require('./user');
const article = require('./article');
const comment = require('./comment.js');

const { articlePages } = require('../controller/article');

const { keepLogin, checkLogin } = require('../middleware/login');

router.get('/', keepLogin, articlePages);



router.use('/user', user.routes()).use(user.allowedMethods());

router.use('/article', article.routes()).use(article.allowedMethods());

router.use('/comment', comment.routes()).use(comment.allowedMethods());


// router.post("/face", keepLogin, async ctx=>{
//     console.log('face');
    
//     console.log('fields: ', ctx.request.body);

//     console.log('files: ', ctx.request.files);
// });

module.exports = router;