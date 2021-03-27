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

exports.postRegister = async (req, res) => {
    console.log(req.body);
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        })
        console.log("user", newUser._id);
        const a = await newUser.save()
        res.redirect('/users/login')
    } catch {
        res.redirect('/users/register')
    }
}