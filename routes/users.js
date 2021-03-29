const express = require('express')
const { postRegister, getRegister, getLogin, postLogin, profile, profileUpload } = require('../controllers/user')
const router = express.Router()
const { checkNotAuthenticated } = require("../helper/auth")
var multer = require('multer')
var path = require('path')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/Images/profiles/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname))
    }
})

var upload = multer({ storage: storage })

router.get("/", profile)

router.post("/", upload.single('avatar'), profileUpload)

router.get('/login', checkNotAuthenticated, getLogin)

router.post('/login', checkNotAuthenticated, postLogin)

router.get('/register', checkNotAuthenticated, getRegister)

router.post('/register', checkNotAuthenticated, postRegister, postLogin)

router.get("/logout", (req, res) => {
    req.logOut()
    res.redirect("/")
})

module.exports = router