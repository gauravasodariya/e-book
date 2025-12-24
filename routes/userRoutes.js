const express = require('express')
const userController = require('../controller/userContoller')
const app = express()

app.post('/login',userController.login)
app.post('/register',userController.register)