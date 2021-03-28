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
                        filteredQuestion.push({ _id, title, subtitle, by, newDate, answerd, userid, ansCount, views, tags })
                })
                res.render('index', { title: 'Home', questions: filteredQuestion, user: req.user })
                // res.json(filteredQuestion)
        } catch (error) {
                res.status(500).json({ err: "internal server error" })
        }
};

exports.singleQuestion = async (req, res) => {
        try {
                const questions = await Question.findOne({_id:req.params.id})
                                        .populate({ 
                                                path: 'answers', 
                                                model: 'Answer', 
                                                populate: { 
                                                        path: 'comments', 
                                                        model: 'Comment' 
                                                } 
                                        })
                                        .exec()
                res.json(questions)
        } catch (error) {
                console.log(error);
                res.status(500).json({ err: "internal server error" })
        }
};

exports.addQuestion = async (req, res) => {
        try {
                const { title, subtitle, tags } = req.body
                // const { username, _id } = req.user

                const newQuestion = new Question({
                        title,
                        subtitle,
                        // by:username,
                        // userid:_id,
                        by: "ovyas24",
                        userid: "123xabc",
                        views: 0,
                        tags
                })

                const result = await newQuestion.save()

                res.json({ result })
        } catch (err) {
                console.log(err);
                res.send("error")
        }
}

exports.deleteQuestions = async (req, res) => {
        try {
                const id = req.params.id
                const isDeleted = await QuestionHelper.deleteQuestion(id)

                if (isDeleted) res.json({ deleted: isDeleted })
                else res.json({ error: "somthing went wrong" })

        } catch (error) {
                res.status(500).json("error: " + error)
        }
}

exports.searchQuestion = async (req, res) => {
        const searchedTerm = req.query.question
        const searchedTerms = searchedTerm.split(" ")

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
                res.json(filteredQuestion)
        } catch (error) {
                res.status(500).json("error: " + error)
        }
}

//asnwer

exports.addAnswer = async (req, res) => {
        try {
                const { answer } = req.body
                const quesId = req.params.id
                console.log(answer, quesId);
                // const { username, _id } = req.user

                const newAnswer = new Answer({
                        by: "ovyas24",
                        userid: "andc1234x",
                        answer
                })
                const ans = await newAnswer.save()
                console.log(ans);
                const result = await Question.updateOne({ _id: quesId }, { $push: { answers: ans._id } })
                res.json(result)
        } catch (error) {
                res.status(500).json("error: " + error)
        }
}

//comment
exports.addComment = async (req, res) => {
        const { comment } = req.body
        const answerId = req.params.id
        // const { username, _id } = req.user
        try {
                const newComment = new Comment({
                        by: "ovyas24",
                        userid: "andc1234x",
                        comment
                })

                const comm = await newComment.save()
                console.log(comm._id);
                const result = await Answer.updateOne({ _id: answerId }, { $push: { comments: comm._id } })

                res.json(result)
        } catch (error) {
                res.status(500).json({ err: "internal server error" })
        }
}