const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userModel = new Schema({
    username:{ type: String, required:true, unique:true},
    email:{ type: String, required:true, unique:true},
    password:{ type: String, required:true},
    profile:String
})

module.exports = mongoose.model('User', userModel)