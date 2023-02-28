const express = require('express')
const { loginUser, checkedUserLoggedIn, getUser, getUsers, addOrUpdateUser, deleteUser } = require('../controller/user')
const { isAuthenticated } = require('../middleware/auth')
const { fileUpload } = require('../middleware/fileUpload')

const routes = express.Router()

routes.route('/login').post(loginUser)

routes.route('/logged_in_user').get(isAuthenticated,checkedUserLoggedIn)

routes.route('/users').get(isAuthenticated,getUsers).post(isAuthenticated,addOrUpdateUser)

routes.route('/user/:id').delete(isAuthenticated,deleteUser).patch(isAuthenticated,fileUpload.any(),addOrUpdateUser).get(isAuthenticated, getUser)

module.exports = routes