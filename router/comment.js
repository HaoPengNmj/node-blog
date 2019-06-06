const commentController = require("../controller/comment")

const commentRouter = require('koa-router')();

const { keepLogin, checkLogin } = require('../middleware/login');

commentRouter.post('/', commentController.submitComment);

module.exports = commentRouter;