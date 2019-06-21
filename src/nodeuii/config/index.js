const path = require('path');

const config = {
    viewDir: path.join(__dirname, '..', 'view'),
    staticDir: path.join(__dirname, '..', 'public')
}
console.log('环境变量：', process.env.NODE_ENV);

//开发
if (process.env.NODE_ENV === 'development') {
    config = Object.assign(config, {
        srcPathPerfix: ''
    });
}
//生产
if (process.env.NODE_ENV === 'production') {
    config = Object.assign(config, {
        srcPathPerfix: '/blog'
    });
}

module.exports = config;