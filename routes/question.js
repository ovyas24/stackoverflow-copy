const express = require('express')
const router = express.Router()
const { addQuestion, singleQuestion, addAnswer, addComment, deleteQuestions } = require("../controllers/question")
const { checkAuthenticated } = require("../helper/auth")

router.get('/:id', singleQuestion)
router.get('/delete/:id', checkAuthenticated, deleteQuestions)
router.post("/",checkAuthenticated, addQuestion )
router.post("/answer/:id",checkAuthenticated,addAnswer)
router.put("/comment/:id",checkAuthenticated, addComment)

module.exports = router