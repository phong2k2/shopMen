const express = require('express');
const route = express.Router();

const AuthController  = require('../app/controllers/AuthController')
const middlewareController = require('../app/middlewares/authMiddleware')

route.post('/register', AuthController.registerUser)
route.post('/login', AuthController.loginUser)
route.post('/refresh', AuthController.requestRefreshToken)
route.post("/logout", middlewareController.verifyToken , AuthController.logOut);

module.exports = route