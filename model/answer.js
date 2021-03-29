const mongoose = require("mongoose")
const Schema = mongoose.Schema

const answerScema = new Schema ({
    by:String,
    userid:String,
    answer:String,
    correct:{ type: Boolean, default:false},
    date:{type:Date, default:Date.now},
    comments :[{type:Schema.ObjectId,ref:'Comment'}],
    likes:[{type:Schema.ObjectId,ref:'User'}]
})

module.exports = mongoose.model("Answer", answerScema) 