const mongoose = require("mongoose")
const Schema = mongoose.Schema

const questionsSchema = new Schema({
    title:{ type:String, required:true},
    by:String,
    userid:String,
    subtitle:String,
    answers: [
        {
            by:String,
            userid:String,
            answer:String,
            correct:Boolean,
            date:{type:Date, default:Date.now},
            comments :[
                {
                    by:String,
                    userid:String,
                    answer:String,
                    date:{type:Date, default:Date.now}
                }
            ]
        }
    ],
    answerd:{ type:Boolean, default:false},
    date:{type:Date, default:Date.now},
    views:Number
})
const Question = mongoose.model("Question", questionsSchema)
module.exports = Question