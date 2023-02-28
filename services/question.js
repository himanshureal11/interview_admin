const questionDao = require("../dao/question")
const { shuffle, examReport } = require("../helper")

const addOrUpdate = async (data,id) => {
    const result = await questionDao.addOrUpdateQuestion(data, id)
    return result
}

const getQuestions = async (subjectId, access_level) => {
    const result = await questionDao.getQuestions(subjectId)
    if(access_level === 100){
        return result
    }else{
        const shuffledArray = shuffle(result)
        return shuffledArray.slice(0,10)
    }
}

const deleteQuestion = async (id) => {
    const result = await questionDao.deleteQuestion(id)
    return result
}

const getQuestion = async (id) => {
    const result = await questionDao.getQuestion(id)
    return result
}

const submitAnswer = async (data , user) => {
    const result = await questionDao.submitAnswer(data)
    const correctAnswer = result.answers.filter(answer => answer.isCorrect)
    await examReport(user.name,correctAnswer.length)
    return result
}
//new
const isUserSubmittedAnswer = async (id) => {
    const result = await questionDao.isUserSubmittedAnswer(id)
    return result
}

module.exports = {
    addOrUpdate,
    getQuestions,
    deleteQuestion,
    getQuestion,
    submitAnswer,
    isUserSubmittedAnswer
}