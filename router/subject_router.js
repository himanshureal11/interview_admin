const express = require('express')
const { addOrUpdate, getSubjects, deleteSubject } = require('../controller/subject')
const { isAuthenticated } = require('../middleware/auth')

const routes = express.Router()

routes.route('/subject').post(isAuthenticated,addOrUpdate).get(isAuthenticated,getSubjects)

routes.route('/subject/:id').delete(isAuthenticated,deleteSubject).patch(isAuthenticated,addOrUpdate)

module.exports = routes