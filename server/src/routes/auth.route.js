const express = require('express')
const {registerController} = require('../controllers/auth.controller')
const {loginController} = require('../controllers/auth.controller')
const {getMe} = require('../controllers/auth.controller')
const authUser = require('../middleware/auth.middleware')

const authRouter = express.Router()

authRouter.post('/register', registerController)

authRouter.post('/login', loginController)

authRouter.get('/get-me', authUser , getMe)

module.exports = authRouter