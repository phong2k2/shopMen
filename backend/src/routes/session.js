const express = require('express');
const router = express.Router();

const { googleOauthHandler } = require('../app/controllers/AuthController');



module.exports = router