const commentSchema = require('../schema/comment');

const {model} = require('../schema/config');

let Comment = model('comments',commentSchema);

module.exports = Comment;