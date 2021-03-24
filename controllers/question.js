const Question  = require("../model/questons")


exports.allQuestions  = async (req,res)=>{
                const questions = await Question.find({})
                res.json(questions)
        };

exports.addQuestion = async (req,res) => {
        const { title, subtitle } = req.body
        const { username, _id } = req.user
        
        
}