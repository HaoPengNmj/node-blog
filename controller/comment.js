const Comment = require('../model/comment');
const Article = require('../model/article');
const User = require('../model/user');
//提交评论
module.exports.submitComment = async ctx => {

    // 验证用户是否登录
    if (ctx.session.isNew) return ctx.body = {
        status: 0,
        msg: "登录才能发表"
    }

    let data = ctx.request.body;
    data.from = ctx.session.uid;//保存自己的id
    console.log(data);

    let _comment = new Comment(data);

    let res = await _comment.save()
        .then(data => {
            return message = {
                status: 1,
                msg: '评论成功'
            }
        })
        .catch(err => {
            message = {
                status: 0,
                msg: err
            }
        });
    //跟新用户评论数，文章评论数
    await Article
        .update({ _id: data.article }, { $inc: { commentNum: 1 } })
        .catch(err => {
            console.log('Article评论计数失败：', err);
        });

    await User
        .update({ _id: data.from }, { $inc: { commentNum: 1 } })
        .catch(err => {
            console.log('user评论计数失败：', err);
        });
    ctx.body = res;
}