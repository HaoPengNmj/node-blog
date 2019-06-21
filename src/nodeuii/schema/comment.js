const { Schema } = require('./config')
const ObjectId = Schema.Types.ObjectId

const commentSchema = new Schema({
    content:String,
    from:{
        type:ObjectId,
        ref:'users'
    },
    article:{
        type:ObjectId,
        ref:'articles'
    },
    commented:{
        type:ObjectId,
        ref:'comments'
    }
}, {
    timestamps: {
        createdAt: "created"
    }
});

module.exports = commentSchema