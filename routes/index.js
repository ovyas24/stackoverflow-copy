const express = require('express')
const { allQuestions } = require('../controllers/question')
const router = express.Router()

router.get('/', allQuestions)
router.use("/questions", require("./question"))
router.use("/users", require("./users"))

module.exports = router