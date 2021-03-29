const express = require('express')
const router = express.Router()
const { addQuestion, singleQuestion, addAnswer, addComment, deleteQuestions, searchQuestion, correctAnswer, delAnswer, delComment, hot } = require("../controllers/question")

router.get('/search', searchQuestion)
router.get("/hot",hot)
router.get('/delete/:id', deleteQuestions)
router.get('/correct/:id', correctAnswer)
router.get("/delete-answer/:id", delAnswer)
router.get("/delete-comment/:id", delComment)
router.get('/:id', singleQuestion)

router.post("/", addQuestion )
router.post("/answer/:id",addAnswer)
router.post("/comment/:id", addComment)

module.exports = router