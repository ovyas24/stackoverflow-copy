const Question = require("../model/questons")
const Answer = require("../model/answer")
const Comment = require("../model/comment");
const QuestionHelper = require("../helper/questionHelper");

//question
exports.allQuestions = async (req, res) => {
        try {
                const questions = await Question.find({})
                let filteredQuestion = []
                questions.forEach((question) => {
                        const { _id, title, subtitle, by, date, answerd, userid, answers, views, tags } = question
                        const ansCount = answers.length
                        const newDate = {
                                day: date.getDate(),
                                month: date.getMonth() + 1,
                                year: date.getFullYear(),
                        }
                        filteredQuestion.push({ _id, title, subtitle, by, newDate,date, answerd, userid, ansCount, views, tags })
                })
                filteredQuestion = filteredQuestion.sort((a, b) => b.date - a.date)
                res.render('index', { title: 'Home', questions: filteredQuestion, user: req.user })
                // res.json(filteredQuestion)
        } catch (error) {
                res.status(500).json({ err: "internal server error" })
        }
};

exports.hot = async (req, res) => {
        try {
                const questions = await Question.find({})
                let filteredQuestion = []
                questions.forEach((question) => {
                        const { _id, title, subtitle, by, date, answerd, userid, answers, views, tags } = question
                        const ansCount = answers.length
                        const newDate = {
                                day: date.getDate(),
                                month: date.getMonth() + 1,
                                year: date.getFullYear(),
                        }

                        if(views > 10) filteredQuestion.push({ _id, title, subtitle, by, newDate, answerd, userid, ansCount, views, tags })
                })
                filteredQuestion = filteredQuestion.sort((a, b) => b.views - a.views)
                res.render('hot', { title: 'Hot', questions: filteredQuestion, user: req.user })
                // res.json(filteredQuestion)
        } catch (error) {
                res.status(500).json({ err: "internal server error" })
        }
};

exports.singleQuestion = async (req, res) => {
        try {
                const question = await Question.findOne({ _id: req.params.id })
                        .populate({
                                path: 'answers',
                                model: 'Answer',
                                populate: {
                                        path: 'comments',
                                        model: 'Comment'
                                }
                        })
                const updated = await Question.updateOne({ _id: question.id }, { views: question.views + 1 })
                res.render('question', { title: 'Home | ' + question.title, question: question, user: req.user })
        } catch (error) {
                console.log(error);
                res.status(500).json({ err: "internal server error" })
        }
};

exports.addQuestion = async (req, res) => {
        const user = req.user
        if (user) {
                try {
                        const { title, subtitle, tags } = req.body
                        const { username, _id } = req.user
                        const tagArray = tags.toLowerCase().split(",", " ")
                        const newQuestion = new Question({
                                title,
                                subtitle,
                                by: username,
                                userid: _id,
                                views: 0,
                                tags: tagArray
                        })

                        const result = await newQuestion.save()

                        res.redirect("/")
                } catch (err) {
                        console.log(err);
                        res.send("error")
                }
        } else {
                res.redirect("/users/login")
        }
}

exports.deleteQuestions = async (req, res) => {
        const user = req.user
        if (user) {
                try {
                        const id = req.params.id
                        const isDeleted = await QuestionHelper.deleteQuestion(id)

                        if (isDeleted) res.redirect("/")        
                        else res.json({ error: "somthing went wrong" })

                } catch (error) {
                        res.status(500).json("error: " + error)
                }
        } else {
                res.redirect("/users/login")
        }
}

exports.searchQuestion = async (req, res) => {
        const searchedTerm = req.query.question
        const searchedTerms = searchedTerm.toLowerCase().split(" ")

        console.log("--------", searchedTerms);
        try {
                const questions = await Question.find()
                const filteredQuestion = []
                questions.forEach((question) => {
                        const { _id, title, subtitle, by, date, answerd, userid, answers, views, tags } = question
                        if (QuestionHelper.compareTags(tags, searchedTerms)) {
                                const newDate = {
                                        day: date.getDate(),
                                        month: date.getMonth() + 1,
                                        year: date.getFullYear(),
                                }
                                filteredQuestion.push({ _id, title, subtitle, by, newDate, answerd, userid, answers, views, tags })
                        }
                })
                res.render('search', { title: 'Home | Search', questions: filteredQuestion, user: req.user })
        } catch (error) {
                res.status(500).json("error: " + error)
        }
}

//asnwer

exports.addAnswer = async (req, res) => {
        const user = req.user
        if (user) {
                try {
                        const { answer } = req.body
                        const quesId = req.params.id
                        const { username, _id } = req.user
                        console.log(answer);
                        if (answer) {
                                const newAnswer = new Answer({
                                        by: username,
                                        userid: _id,
                                        answer
                                })
                                const ans = await newAnswer.save()
                                console.log(ans);
                                const result = await Question.updateOne({ _id: quesId }, { $push: { answers: ans._id } })
                        }
                        res.redirect("/questions/" + quesId)
                } catch (error) {
                        res.status(500).json("error: " + error)
                }
        } else {
                res.redirect("/users/login")
        }
}

//comment
exports.addComment = async (req, res) => {
        const { comment } = req.body
        const answerId = req.params.id
        const quesId = req.query.quesId

        const { username, _id } = req.user
        const user = req.user
        if (user) {
                try {
                        if (comment) {
                                const newComment = new Comment({
                                        by: username,
                                        userid: _id,
                                        comment
                                })

                                const comm = await newComment.save()
                                console.log(comm._id);
                                const result = await Answer.updateOne({ _id: answerId }, { $push: { comments: comm._id } })
                        }

                        res.redirect("/questions/" + quesId)
                } catch (error) {
                        res.status(500).json({ err: "internal server error" })
                }
        } else {
                res.redirect("/users/login")
        }
}

exports.correctAnswer = async (req, res) => {
        const user = req.user
        if (user._id = req.query.userID) {
                const updateAnswer = await Answer.updateOne({ _id: req.params.id }, { correct: true })
                const updateQuestion = await Question.updateOne({ _id: req.query.quesID }, { answerd: true })

                res.redirect("/questions/" + req.query.quesID)
        } else {
                res.redirect("/users/login")
        }
}

exports.delAnswer = async (req,res)=>{
        const isDeleted = await QuestionHelper.deleteAnswer(req.params.id)
        res.redirect("/questions/"+req.query.quesId)
}

exports.delComment = async (req,res)=>{
        const isDeleted = await QuestionHelper.comment(req.params.id)
        res.redirect("/questions/"+req.query.quesId)
}