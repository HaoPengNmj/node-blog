const articlesRouter = require('koa-router')();

const articleController = require('../controller/article');

const { keepLogin, checkLogin } = require('../middleware/login');

//发表文章页面
articlesRouter.get('/', checkLogin, articleController.addpage);

//发表文章post
articlesRouter.post('/', keepLogin, articleController.add);

//我的文章
//articlesRouter.get('/my', articleController.myArticle);

//文章详情页
articlesRouter.get('/detail/:id', keepLogin, articleController.articleDetail);

//文章列表页
articlesRouter.get('/page/:id', keepLogin, articleController.articlePages);

module.exports = articlesRouter;