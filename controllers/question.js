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
                        const { _id, title, subtitle, by, date, answerd, userid, answers } = question
                        const newDate = {
                                day: date.getDate(),
                                month: date.getMonth() + 1,
                                year: date.getFullYear(),
                        }
                        filteredQuestion.push({ _id, title, subtitle, by, newDate, answerd, userid, answers })
                })
                res.render('index', { title:'Home', questions:filteredQuestion, user:req.user})
        } catch (error) {
                res.status(500).json({err:"internal server error"})
        }
};

exports.singleQuestion = async (req, res) => {
        try {
                const que = await Question.findById(req.params.id)
                const { by, userid, title, subtitle, date, answerd, views } = que
                let answerList = que.answers ? que.answers : []

                let answers = await QuestionHelper.ansList(answerList)

                let question = {
                        by,
                        userid,
                        title,
                        subtitle,
                        answers,
                        date,
                        answerd,
                        views
                }

                res.json(question)

        } catch (error) {
                console.log(error);
                res.status(404).json("error: no question with this id")
        }
};

exports.addQuestion = async (req, res) => {
        const { title, subtitle } = req.body
        // const { username, _id } = req.user

        const newQuestion = new Question({
                title,
                subtitle,
                // by:username,
                // userid:_id,
                by: "ovyas24",
                userid: "123xabc",
                views: 0
        })

        const result = await newQuestion.save()

        res.json({ result })
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

//asnwer

exports.addAnswer = async (req, res) => {
        const { answer } = req.body
        const quesId = req.params.id
        // const { username, _id } = req.user

        const newAnswer = new Answer({
                by: "ovyas24",
                userid: "andc1234x",
                answer
        })
        const ans = await newAnswer.save()
        const result = await Question.updateOne({ _id: quesId }, { $push: { answers: ans._id } })
        res.json(result)
}

//comment
exports.addComment = async (req, res) => {
        const { comment } = req.body
        const answerId = req.params.id
        // const { username, _id } = req.user
        try{
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
                res.status(500).json({err:"internal server error"})
        }
}