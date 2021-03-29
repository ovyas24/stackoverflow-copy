const User = require("../model/users")
const passport = require('passport')
const bcrypt = require("bcryptjs")
const Question = require("../model/questons")
const Answer = require("../model/answer")
const Comment = require("../model/comment");
const QuestionHelper = require("../helper/questionHelper");

exports.profile = async (req, res) => {
    if(req.user){
        try {
            const user = req.user
            const questions = await Question.find({by:user.username})
            const answersList = await Answer.find({by:user.username})
            const correctAnswer = answersList.filter((ans)=> ans.correct == true)
            let filteredQuestion = []
            questions.forEach((question) => {
                const { _id, title, subtitle, by, date, answerd, userid, answers, views, tags } = question
                const ansCount = answers.length
                const newDate = {
                    day: date.getDate(),
                    month: date.getMonth() + 1,
                    year: date.getFullYear(),
                }
                filteredQuestion.push({ _id, title, subtitle, by, newDate, answerd, userid, ansCount, views, tags })
            })

            const stats = {
                qcount: questions.length,
                acount: answersList.length,
                cacount: correctAnswer.length
            }

            res.render('user', { title: user.username, questions: filteredQuestion, user: req.user , stats})
            // res.json(filteredQuestion)
        } catch (error) {
            res.status(500).json({ err: "internal server error" })
        }
    }else{
        res.redirect("/users/login")
    }
}

exports.profileUpload = async (req,res)=>{
    if(req.user){
        try {
            const user = req.user
            const file = req.file
            console.log(file);

            const Upload = await User.updateOne({_id:user._id},{profile:file.filename})

            res.redirect("/users")

        } catch (error) {
            res.status(500).json({ err: "internal server error" })
        }
    }else{
        res.redirect("/users/login")
    }
}

exports.getLogin = (req, res) => {
    res.render('login', { layout: 'auth' })
}

exports.postLogin = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
})

exports.getRegister = (req, res) => {
    res.render('register', { layout: 'auth' })
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
    } catch (error) {
        console.log(error.code); //11000 for dupplicate email
        if (error.code == 11000) {
            req.flash("message", "Email Already Registerd")
            res.redirect('/users/register')
        } else {
            req.flash("message", "Internal Error Try Again")
            res.redirect('/users/register')
        }
    }
}