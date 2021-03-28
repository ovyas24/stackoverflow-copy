const express = require('express')
const { allQuestions } = require('../controllers/question')
const router = express.Router()
router.use("/questions", require("./question"))
router.use("/users", require("./users"))
router.get('/', allQuestions)

module.exports = router