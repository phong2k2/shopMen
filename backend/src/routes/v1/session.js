const express = require('express');
const router = express.Router();

const { googleOauthHandler } = require('../../app/controllers/v1/AuthController');

module.exports = router