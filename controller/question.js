const questionService = require("../services/question")

const addOrUpdateQuestion = async (req,res) => {
    const data = req.body
    const id = req.params.id
    const result = await questionService.addOrUpdate(data, id)
    res.json({status: 'success', data: result}) 
}

const getQuestions = async (req,res) => {
    const id = req.params.id
    const user = req.user
    const result = await questionService.getQuestions(id, user.access_level)
    res.json({status: 'success', data: result}) 
}

const deleteQuestion = async (req,res) => {
    const id = req.params.id
    const result = await questionService.deleteQuestion(id)
    res.json({status: 'success', data: result}) 
}

const getQuestion = async (req,res) => {
    const id = req.params.id
    const result = await questionService.getQuestion(id)
    res.json({status: 'success', data: result}) 
}

const submitAnswer = async (req, res) => {
    const data = req.body
    const user = req.user
    const result = await questionService.submitAnswer(data, user)
    res.json({status: 'success', data: result})
}


const isUserSubmittedAnswer = async (req, res) => {
    const id = req.params.id
    const result = await questionService.isUserSubmittedAnswer(id)
    res.json({status: 'success', data: result})
}

module.exports = {
    addOrUpdateQuestion,
    getQuestions,
    deleteQuestion,
    getQuestion,
    submitAnswer,
    isUserSubmittedAnswer
}