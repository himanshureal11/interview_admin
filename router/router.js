const express = require('express')
const routes = express.Router()
const userRoutes = require('./user_router')
const subjectRoutes = require('./subject_router')
const questionRoutes = require('./question_router')


routes.use('/', userRoutes)

routes.use('/', subjectRoutes)

routes.use('/', questionRoutes)

module.exports = routes