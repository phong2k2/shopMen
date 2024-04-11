const express = require("express");
const router = express.Router();
const authController = require("../../app/controllers/v1/AuthController");
require("../../configs/passport");
require("dotenv").config();

router.route("/register").post(authController.register);

router.route("/login").post(authController.login);

router.route("/refresh").post(authController.requestRefreshToken);

router.route("/logout").post(authController.logOut);

router.route("/forgot-password").post(authController.forgotPassword);

router.route("/reset-password").post(authController.resetPassword);

// LOGIN GOOGLE
router.route("/oauth/google").get(authController.googleOauthHandler);

module.exports = router;
