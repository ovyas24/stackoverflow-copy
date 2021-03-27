const mongoose = require("mongoose")
const Schema = mongoose.Schema

const questionsSchema = new Schema({
    title:{ type:String, required:true},
    by:String,
    userid:String,
    subtitle:{ type:String, default:null},
    answers: [],
    answerd:{ type:Boolean, default:false},
    date:{type:Date, default:Date.now},
    tags:Array,
    views:Number
})
const Question = mongoose.model("Question", questionsSchema)
module.exports = Question