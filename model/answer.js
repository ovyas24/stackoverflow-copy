const mongoose = require("mongoose")
const Schema = mongoose.Schema

const answerScema = new Schema ({
    by:String,
    userid:String,
    answer:String,
    correct:{ type: Boolean, default:false},
    date:{type:Date, default:Date.now},
    comments :[],
    likes:{
        count:{type:Number,default:0},
        userid:{type:String}
    },
    dislikes:{
        count:{type:Number,default:0},
        userid:{type:String}
    }
})

module.exports = mongoose.model("Answer", answerScema)