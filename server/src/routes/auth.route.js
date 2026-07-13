const express = require('express')
const registerController = require('../controllers/auth.controller')

const authRouter = express.Router()

authRouter.post('/register', registerController)

module.exports = authRouter