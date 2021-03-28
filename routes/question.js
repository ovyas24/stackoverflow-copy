const express = require('express')
const router = express.Router()
const { addQuestion, singleQuestion, addAnswer, addComment, deleteQuestions, searchQuestion, test } = require("../controllers/question")
const { checkAuthenticated } = require("../helper/auth")

router.get('/search', searchQuestion)
router.get('/:id', singleQuestion)
router.get('/delete/:id', deleteQuestions)

router.post("/", addQuestion )
router.post("/answer/:id",addAnswer)
router.put("/comment/:id", addComment)

module.exports = router