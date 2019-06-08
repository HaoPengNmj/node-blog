const mongoose = require('mongoose');

const { path } = require('../config/db') || 'mongodb://localhost:27017/blogproject';

mongoose.connect(path,
    { useNewUrlParser: true })
    .then(() => {
        console.log('mongodb连接成功');
    }, (err) => {
        console.log('mongodb连接失败:', err);
    });

const Schema = mongoose.Schema
const model = mongoose.model

module.exports = {
    mongoose,
    Schema,
    model
}