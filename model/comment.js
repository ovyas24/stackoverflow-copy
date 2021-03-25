const mongoose = require("mongoose")
const Schema = mongoose.Schema

const commentScema = new Schema ({
    by:String,
    userid:String,
    comment:String,
    date:{type:Date, default:Date.now}
})

module.exports = mongoose.model("Comment", commentScema)