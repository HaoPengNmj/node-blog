const log4js = require('log4js');

log4js.configure({
    appenders: { cheese: { type: 'file', filename: './logs/cheese.log' } },
    categories: { default: { appenders: ['cheese'], level: 'error' } }
});

const logger = log4js.getLogger('cheese');

// logger.trace('Entering cheese testing');
// logger.debug('Got cheese.');
// logger.info('Cheese is Comté.');
// logger.warn('Cheese is quite smelly.');
// logger.error('Cheese is too ripe!');
// logger.fatal('Cheese was breeding ground for listeria.');

//容错中间件

const errorHandler = {
    //报错
    errorCode() {
        return async (ctx, next) => {
            try {
                await next();
            } catch (error) {
                logger.error(error);
                ctx.status = error.status || 500;
                ctx.body = await ctx.render("error");
            }
        }
    },
    //404
    notFound() {
        return async (ctx, next) => {
            await next();
            if(404 == ctx.status){
                ctx.status = 404;
                ctx.body = await ctx.render("notfound");
            }
        }
    }
}

module.exports = errorHandler;