const express = require('express')
const router = express.Router()
const Question  = require("../model/questons")
const { allQuestions } = require("../controllers/question")

router.get('/', allQuestions)

router.post("/",(req,res)=>{
    res.send("")
})

module.exports = router