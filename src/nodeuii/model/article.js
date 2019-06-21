const articleSchema = require('../schema/article');

const {model} = require('../schema/config');

let Article = model('articles',articleSchema);

module.exports = Article;