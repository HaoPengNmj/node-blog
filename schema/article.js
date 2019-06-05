const {Schema} =require('./config')

const ObjectId = Schema.Types.ObjectId;

const articleShema = new Schema({
    title:String,
    content:String,
    tips:String,
    author:{
        type:ObjectId,
    }
})