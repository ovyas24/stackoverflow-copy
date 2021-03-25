const Question = require("../model/questons")
const Answer = require("../model/answer")
const Comment = require("../model/comment")

class QuestionHelper {
    constructor() { }
    async comList(commentList) {
        const comments = []

        for (let i = 0; i < commentList.length; i++) {
            const com = await Comment.findById(commentList[i])
            comments.push(com)
        }

        return comments
    }

    async ansList(answerList){
        const answers = []

        for (let i = 0; i < answerList.length; i++) {
            const ans = await Answer.findById(answerList[i])
            const { _id, by, userid, answer, date, likes, dislikes } = ans

            let commentList = ans.comments ? ans.comments : []
            let comments = await this.comList(commentList)

            const answ = {
                _id,
                by,
                userid,
                answer,
                comments,
                date,
                totalLike: likes - dislikes
            }

            answers.push(answ)
        }

        return answers
    }

    //delete comment
    deleteComment = async (id) => {
        try {
            console.log("break-c");
            await Comment.deleteOne({ _id: id })
            console.log("break-c");
            return true
        } catch (error) {
            return false
        }
    }

    //deleteAnswer
    deleteAnswer = async (id) => {
        try {
            const answer = await Answer.findById(id)
            console.log(answer);
            console.log("break-an");
            const comments = answer.comments
            console.log(comments);
            for (let i = 0; i < comments.length; i++) {
                console.log("break-an1");
                await this.deleteComment(comments[i]._id)
                console.log("break-an2");
            }
            await Answer.deleteOne({ _id: id })
            console.log("break1-an3");
            return true
        } catch (error) {
            return false
        }
    }

    //deleteAllAnswer 
    deleteQuestion = async (id) => {
        try {
            const question = await Question.findById(id)
            const list = question.answers
            console.log("break");
            for (let i = 0; i < list.length; i++) {
                console.log("break-an0");
                await this.deleteAnswer(list[i]._id)
            }

            await Question.deleteOne({ _id:id })
            console.log("break1");
            return true
        } catch (error) {
            return false
        }
    }
}

module.exports = new QuestionHelper()