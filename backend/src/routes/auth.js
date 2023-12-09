const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../configs/passport')
require('dotenv').config()


const authController  = require('../app/controllers/AuthController')
const middlewareController = require('../app/middlewares/authMiddleware')

router.post('/register', authController.register)
router.post('/login', authController.login)
router.post('/refresh', authController.requestRefreshToken)
router.post("/logout", authController.logOut);
router.post('/forgot-password', authController.forgotPassword)
router.post('/reset-password', authController.resetPassword)

// LOGIN GOOGLE
router.get('/oauth/google', authController.googleOauthHandler);



module.exports = router