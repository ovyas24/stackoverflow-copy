const User = require("../model/users")
const passport = require('passport')
const bcrypt = require("bcryptjs")

exports.getLogin = (req, res) => {
    res.render('login',{layout:'auth'})
}

exports.postLogin = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
})

exports.getRegister =  (req, res) => {
    res.render('register',{layout:'auth'})
}

exports.postRegister = async (req, res, next) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        })
        const a = await newUser.save()
        next()
    } catch(error) {
        console.log(error.code); //11000 for dupplicate email
        if(error.code == 11000) {
            req.flash("message","Email Already Registerd")
            res.redirect('/users/register')
        }else{
            req.flash("message","Internal Error Try Again")
            res.redirect('/users/register')
        }
    }
}