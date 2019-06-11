const User = require('../model/user');
const encrypt = require('../util/encrypt');
const setCookie = require('../util/cookie');

const getRight = require('../config/role');

//注册
module.exports.userReg = async ctx => {
    let { name, password } = ctx.request.body;
    let res = await new Promise((resolve, reject) => {
        User.find({ username: name }, (err, data) => {
            console.log(err, data);

            if (err) return reject(err);
            if (data.length !== 0) return reject('用户名已存在');

            var user = new User({
                name,
                password: encrypt(password),
                commentNum: 0,
                articleNum: 0
            });
            user.save((err, data) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(data);
                }
            })
        });
    }).then(data => {
        return { status: '注册成功' }

    }).catch((err) => {
        return { status: err }
    });
    console.log(res);
    ctx.body = await ctx.render('isOk', { ...res, path: '/blog/' });
}

//登录
module.exports.userLog = async ctx => {

    let { name, password } = ctx.request.body;
    console.log('login', name, password);

    let res = await new Promise((resolve, reject) => {
        User.find({ username: name }, (err, data) => {
            console.log(err, data);

            if (err) return reject(err);
            if (data.length === 0) {
                reject('用户名不存在');
                return;
            }
            if (data[0].password !== encrypt(password)) {
                return reject('密码错误')
            }
            resolve(data[0]);
        });
    }).then(data => {
        setCookie(ctx, 'uname', data.username);
        setCookie(ctx, 'uid', data._id);
        ctx.session = {
            username: data.username,
            uid: data._id,
            avatar: data.avatar,
            role: data.role
        }

        return { status: '登录成功' }

    }).catch((err) => {
        console.log('错误', err);
        return { status: err }
    });
    console.log(res);
    ctx.body = await ctx.render('isOk', { ...res, path: '/blog/' });
}

module.exports.logout = async ctx => {
    ctx.session = null
    ctx.cookies.set("uname", null, {
        maxAge: 0
    })

    ctx.cookies.set("uid", null, {
        maxAge: 0
    })
    // 在后台做重定向到 根  
    ctx.redirect("/blog/")
}

//我的
module.exports.userCenter = async ctx => {
    
    
    //获取权限
    const page = ctx.params.id || 'article';
    const role = ctx.session.role || 1;
    const roleRight = getRight(role);

    console.log('userCenter::',page);

    ctx.body = await ctx.render(`admin/admin-${page}`, {
        role: ctx.session.role,
        roleRight
    });
}

//头相上传
module.exports.uploadface = async ctx => {
    //console.log('face');
    const filename = ctx.req.file.filename;
    let res = await User
        .updateOne({ _id: ctx.session.uid }, { $set: { avatar: "/facefile/" + filename } })
        .then(res => {
            return {
                status: 1,
                message: "上传成功"
            }
        }).catch(err => {
            return {
                status: 0,
                message: "上传失败"
            }
        });
    ctx.session.avatar = "/facefile/" + filename;
    ctx.body = res;
}


// async function test() {
//     let res = await new Promise((resolve, reject) => {
//         setTimeout(() => {
//             reject('aaa');
//             //console.log(1);

//         }, 2000);
//     }).then(res => {
//         console.log('then', res);
//         return 'bbb'

//     }).catch(err => {
//         console.log('catch', err);
//         return 'ccc'
//     })
//     console.log('res', res);
// }
// test()

// test().then((res)=>{
//     console.log(2,res);

// }).catch((err)=>{
//     console.log(3,err);

// })

// async function go() {
//     var res = await test();
//     console.log(res);

// }
// go()