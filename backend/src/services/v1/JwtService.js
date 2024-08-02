const { StatusCodes } = require("http-status-codes")
const jwt = require("jsonwebtoken")
const { env } = require("../../configs/environment")
const ApiError = require("../../utils/ApiError")
const { totp } = require("otplib")

// create access token
const generalAccessToken = (user) => {
  const accessToken = jwt.sign(
    {
      id: user._id,
      isAdmin: user._isAdmin
    },
    env.JWT_ACCESS_KEY,
    {
      expiresIn: env.EXPIRED_ACCESS_TOKEN
    }
  )
  return accessToken
}
// create refresh token
const generalRefreshToken = (user) => {
  const refreshToken = jwt.sign(
    {
      id: user._id,
      isAdmin: user._isAdmin
    },
    env.JWT_REFRESH_TOKEN,
    {
      expiresIn: env.EXPIRED_REFRESH_TOKEN
    }
  )
  return refreshToken
}

const generateVerifyEmailToken = () => {
  totp.options = { step: 60, window: 1 }
  return totp.generate(env.VERIFY_EMAIL_SECRET)
}

module.exports = {
  generalAccessToken,
  generalRefreshToken,
  generateVerifyEmailToken
}
