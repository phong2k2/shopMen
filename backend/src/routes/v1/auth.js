const express = require("express");
const passport = require("passport");
const router = express.Router();
const authController = require("../../app/controllers/v1/AuthController");
require("dotenv").config();

router.route("/register").post(authController.register);

router.route("/login").post(authController.login);

router.route("/refresh").post(authController.requestRefreshToken);

router.route("/logout").post(authController.logOut);

router.route("/forgot-password").post(authController.forgotPassword);

router.route("/reset-password").post(authController.resetPassword);

// LOGIN GOOGLE
router.route("/google").get(
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.route("/google/redirect").get(
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5173/404",
  }),
  authController.googleRedirect
);

module.exports = router;
