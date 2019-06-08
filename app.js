const koa = require('koa');
const app = new koa();
const router = require('./router/index');
const render = require('koa-swig');
const static = require('koa-static');
const body = require('koa-body');
const session = require('koa-session');
const co = require('co');
const path = require('path');
const errorHandler = require('./middleware/errorHandler');

app.keys = ['chpblog'];

const sessionConfig = {
    key: 'iloveyou', /** (string) cookie key (default is koa:sess) */
    /** (number || 'session') maxAge in ms (default is 1 days) */
    /** 'session' will result in a cookie that expires when session/browser is closed */
    /** Warning: If a session cookie is stolen, this cookie will never expire */
    maxAge: 36e5,//86400000,
    autoCommit: true, /** (boolean) automatically commit headers (default true) */
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    httpOnly: true, /** (boolean) httpOnly or not (default true) */
    signed: true, /** (boolean) signed or not (default true) */
    rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
    renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
}

app.context.render = co.wrap(render({
    //设置简单的配置
    root: path.join(__dirname, 'view'),//视口路径
    autoescape: true,
    cache: 'memory', // disable, set to false
    ext: 'html',
    writeBody: false
}));

app.use(errorHandler.errorCode())
    .use(errorHandler.notFound());

app.use(session(sessionConfig, app));

app.use(body());

app.use(static(path.join(__dirname, 'public')));

app.use(router.routes()).use(router.allowedMethods());

app.listen(3222, () => {
    console.log("项目启动成功，监听在3222端口")
})
