const User = require('../model/user');
//有cookie，自动登陆
module.exports.keepLogin = async (ctx, next) => {
    if (ctx.session.isNew) {
        console.log('session is new');        
        if (ctx.cookies.get('uname')) {
            let id = ctx.cookies.get('uid');
            let data = await User.findById(id);
            ctx.session = {
                username: data.username,
                uid: data._id,
                avatar: data.avatar,
                role: data.role
            }
        }
    }
    console.log('kkk1');
    await next();
    console.log('kkk2');

}


module.exports.checkLogin = async (ctx, next) => {
    if (ctx.session.isNew) {
        if (ctx.cookies.get('uname')) {
            let id = ctx.cookies.get('uid');
            let data = await User.findById(id);
            ctx.session = {
                username: data.username,
                uid: data._id,
                avatar: data.avatar,
                role: data.role
            }
            await next();
        }
        else {
            //跳去登录
            ctx.body = await ctx.render('reglog', { isreg: false, title: '登陆注册' });
        }
    } else {
        await next();
    }
}