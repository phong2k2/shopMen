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



// router.get('/login/success', authController.loginSuccess)

// router.get("/login/failed", (req, res) => {
//     res.status(401).json({
//         error: true,
// 		message: "Log in failure",
// 	});
// });

// router.get('/google',
//   passport.authenticate('google', { scope: ['profile', 'email'], session: false }));
  
// router.get('/google/callback', 
//     passport.authenticate('google', {
//         successRedirect: `http://localhost:5173`,
//         failureRedirect: `http://localhost:3000/api/auth/login/failed`
//     })
// );

// router.get(
//     '/auth/google',
//     passport.authenticate('google', { scope: ['profile', 'email'] })
// );
  
// router.get(
//     '/google/callback',
//     passport.authenticate('google', { failureRedirect: '/' }),
//     (req, res) => {
//         // Successful authentication, redirect to the client app
//         res.redirect('http://localhost:5173/');
//     }
// );
  


module.exports = router