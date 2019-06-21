const commentController = require("../controller/comment")

const commentRouter = require('koa-router')();

const { keepLogin } = require('../middleware/login');

commentRouter.post('/', keepLogin, commentController.submitComment);

module.exports = commentRouter;