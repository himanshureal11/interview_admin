const express = require('express')
const { addOrUpdateQuestion, getQuestions, deleteQuestion, getQuestion, submitAnswer, isUserSubmittedAnswer } = require('../controller/question')
const { isAuthenticated } = require('../middleware/auth')

const routes = express.Router()

routes.route('/question').post(isAuthenticated,addOrUpdateQuestion)

routes.route('/questions/:id').get(isAuthenticated,getQuestions)

routes.route('/question/:id').patch(isAuthenticated,addOrUpdateQuestion).delete(isAuthenticated,deleteQuestion).get(isAuthenticated,getQuestion)

routes.route('/submit_answer').post(isAuthenticated, submitAnswer)

routes.route('/answer/:id').get(isAuthenticated, isUserSubmittedAnswer)

module.exports = routes