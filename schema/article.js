const { Schema } = require('./config')

const ObjectId = Schema.Types.ObjectId;

const articleShema = new Schema({
    title: String,
    content: String,
    author: {
        type: ObjectId,
        ref: 'users'
    },
    tips: {
        type: [String],
        default: undefined
    },
    commentNum: Number,
    filePath: {
        type: String,
        default: ''
    }
}, {
        timestamps: {
            createdAt: "created"
        }
    })

module.exports = articleShema