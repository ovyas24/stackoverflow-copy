const express = require('express')
const { allQuestions } = require('../controllers/question')
const { checkAuthenticated } = require("../helper/auth")
const router = express.Router()

router.get('/', allQuestions)
router.use("/questions", checkAuthenticated, require("./question"))
router.use("/users", require("./users"))

module.exports = router