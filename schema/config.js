const mongoose = require('mongoose');

mongoose.connect("mongodb://39.108.225.12:27017/blogproject",
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