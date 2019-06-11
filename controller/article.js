const Article = require('../model/article');
const User = require('../model/user');
const Comment = require('../model/comment');

//发表文章页面
module.exports.addpage = async ctx => {
    console.log('文章发表');
    ctx.body = await ctx.render('addArticle', {
        title: '文章发表',
        session: ctx.session
    })
    //ctx.body = 'asdsdasd';
}

//发表文章post
module.exports.add = async ctx => {
    if (ctx.session.isNew) {
        return ctx.body = {
            msg: "用户未登录",
            status: 0
        }
    }
    let data = ctx.request.body;
    data.author = ctx.session.uid;
    data.commentNum = 0;

    let res = await new Promise((resolve, reject) => {
        new Article(data).save((err, data) => {
            if (err) return reject('保存失败');

            User.update({ _id: data.author }, { $inc: { articleNum: 1 } })
                .then((res) => {
                    resolve('cg');
                    console.log('User更新成功');
                })
                .catch((err) => {
                    resolve('sb');
                    console.log('User更新失败');
                })
        })
    }).then(data => {
        return {
            msg: "发表成功",
            status: 1
        }
    }).catch(err => {
        return {
            msg: "发表失败",
            status: 0
        }
    })

    console.log('发表的数据', data);
    ctx.body = res;


}


//文章详情页
module.exports.articleDetail = async ctx => {
    const _id = ctx.params.id;

    let article = await Article
        .findById(_id)
        .populate("author", "username")
        .then(data => data)
        .catch(err => {
            console.log(err);
            return {}
        });

    let comment = await Comment
        .find({ article: _id })
        .sort("-created")
        .populate("from", "username avatar")
        .then(data => data)
        .catch(err => {
            console.log(err)
            return []
        });

    //console.log(article, comment);


    ctx.body = await ctx.render('article', {
        article,
        comment,
        title: article.title,
        session: ctx.session
    })
}

//文章列表页
module.exports.articlePages = async ctx => {
    console.log(111111111);

    let page = (ctx.params.id || 1) - 1;

    const maxNum = await Article.estimatedDocumentCount((err, num) => {
        if (err) {
            console.log(err);
            return 0;
        } else {
            return num;
        }
    })

    const artList = await Article
        .find()
        .sort('-created')
        .skip(2 * page)
        .limit(2)
        .populate({
            path: "author",
            select: '_id username avatar'
        }) // mongoose 用于连表查询
        .then(data => data)
        .catch(err => {
            console.log(err);
            return [];
        });
    //console.log(artList);


    ctx.body = await ctx.render('index', {
        session: ctx.session,
        title: '博客首页',
        artList,
        maxNum
    })
}


//我的文章 json
module.exports.myArticles = async ctx => {
    const uid = ctx.session.uid

    const data = uid ? await Article.find({ author: uid }) : [];

    ctx.body = {
        code: 0,
        count: data.length,
        data
    }
}

//删除文章
module.exports.removeArticle = async ctx => {
    if (ctx.session.isNew) {
        return ctx.body = {
            msg: "用户未登录",
            status: 0
        }
    }

    const articleId = ctx.pramas.id;

    const res = await Article.remove({ '_id': articleId })
        .then(res => {
            return { state: 1, message: "成功" }
        })
        .catch(err => {
            return { state: 0, message: err }
        });

    ctx.body = res;   
}