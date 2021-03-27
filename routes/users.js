const express = require('express')
const { postRegister, getRegister, getLogin, postLogin } = require('../controllers/user')
const router = express.Router()
const { checkNotAuthenticated } = require("../helper/auth")

router.get('/login', checkNotAuthenticated, getLogin)

router.post('/login', checkNotAuthenticated, postLogin)

router.get('/register', checkNotAuthenticated, getRegister)

router.post('/register', checkNotAuthenticated, postRegister , postLogin)

router.get("/logout",(req,res)=>{
    req.logOut()
    res.redirect("/")
})

module.exports = router