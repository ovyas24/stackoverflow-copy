const express = require('express')
const router = express.Router()
const { allQuestions, addQuestion, singleQuestion, addAnswer, addComment, deleteQuestions } = require("../controllers/question")

router.get('/', allQuestions)
router.get('/:id', singleQuestion)
router.get('/delete/:id', deleteQuestions)
router.post("/", addQuestion )
router.post("/answer/:id",addAnswer)
router.put("/comment/:id", addComment)

module.exports = router