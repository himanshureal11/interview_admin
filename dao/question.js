const { upsert } = require("../helper/mongo_helper")
const { Question, Answer } = require("../model/question")

const addOrUpdateQuestion = async (data,id = undefined) => {
    const  result = await upsert(data,Question,id)
    return result
}

const getQuestions = async (subjectId) => {
    const result = await Question.find({subject_id: subjectId})
    return result
}

const deleteQuestion = async (id) => {
    const result = await Question.deleteOne({_id: id})
    return result
}

const getQuestion = async (id) => {
    const result = await Question.findOne({_id: id})
    return result
}

const submitAnswer = async (data) => {
    const result = await Answer.create(data)
    return result
}

const isUserSubmittedAnswer = async (id) => {
    const result = await Answer.findOne({user_id: id})
    return result
}

module.exports = {
    addOrUpdateQuestion,
    getQuestions,
    deleteQuestion,
    getQuestion,
    submitAnswer,
    isUserSubmittedAnswer
}