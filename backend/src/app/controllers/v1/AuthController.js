const AuthService = require("../../../services/v1/AuthService")
const EmailService = require("../../../services/v1/EmailService")
const JwtService = require("../../../services/v1/JwtService")
const User = require("../../model/User")
const { StatusCodes } = require("http-status-codes")
const ApiError = require("../../../utils/ApiError")
const { env } = require("../../../configs/environment")
const { parseTimeToSeconds } = require("../../../utils/parseTime")

const cookieOptionsRefreshToken = {
  httpOnly: true,
  secure: false,
  sameSite: false,
  path: "/",
  maxAge: parseTimeToSeconds(env.EXPIRED_REFRESH_TOKEN)
}

const AuthController = {
  register: async (req, res, next) => {
    try {
      const { email } = req.body
      const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
      const isCheckEmail = reg.test(email)
      if (!isCheckEmail) {
        throw new ApiError(
          StatusCodes.UNPROCESSABLE_ENTITY,
          "Thông tin đầu vào không phải là email hợp lệ"
        )
      }
      const response = await AuthService.register(req.body)
      res.status(StatusCodes.OK).json(response)
    } catch (error) {
      next(error)
    }
  },

  login: async (req, res, next) => {
    try {
      const { email } = req.body
      const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
      const isCheckEmail = reg.test(email)
      if (!isCheckEmail) {
        throw new ApiError(
          StatusCodes.UNPROCESSABLE_ENTITY,
          "Thông tin đầu vào không phải là email hợp lệ"
        )
      }
      const response = await AuthService.login(req.body)

      const {
        meta: { accessToken, refreshToken },
        data
      } = response
      res.cookie("refreshToken", refreshToken, cookieOptionsRefreshToken)
      const dataLogin = {
        data,
        meta: {
          accessToken
        }
      }
      res.status(StatusCodes.OK).json(dataLogin)
    } catch (error) {
      next(error)
    }
  },

  // Refresh Token
  requestRefreshToken: async (req, res, next) => {
    try {
      const refreshTokenOld = req.cookies.refreshToken
      if (!refreshTokenOld || refreshTokenOld == "undefined") {
        throw new ApiError(
          StatusCodes.UNAUTHORIZED,
          "You are not authenticated"
        )
      }
      const response = await AuthService.requestRefreshToken(refreshTokenOld)
      const { accessToken, refreshToken } = response

      res.cookie("refreshToken", refreshToken, cookieOptionsRefreshToken)

      res.status(StatusCodes.OK).json({
        accessToken
      })
    } catch (error) {
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
        maxAge: 0
      })
      next(error)
    }
  },

  // Forgot Password
  forgotPassword: async (req, res, next) => {
    try {
      const { email } = req.body
      const response = await AuthService.forgotPassword(email)

      res.status(StatusCodes.OK).json(response)
    } catch (error) {
      next(error)
    }
  },

  resetPassword: async (req, res, next) => {
    try {
      const { userId, code } = req.query
      const { password, confirmPassword } = req.body

      const response = await AuthService.resetPassword(userId, code, password)
      res.status(StatusCodes.OK).json(response)
    } catch (error) {
      next(error)
    }
  },

  // Logout
  logOut: async (req, res) => {
    try {
      res.clearCookie("refreshToken")
      res.status(StatusCodes.OK).json({ message: "Logged out successfully!" })
    } catch (error) {
      next(error)
    }
  },

  googleRedirect: async (req, res, next) => {
    const { accessToken, refreshToken } = AuthService.createJwt(req.user)
    res.cookie("refreshToken", refreshToken, cookieOptionsRefreshToken)
    res.redirect(`http://localhost:5173/social?token=${accessToken}`)
  },

  sendVerificationEmail: async (req, res, next) => {
    try {
      const { email } = req.body

      const emailVerified = await User.findOne({ email })

      if (emailVerified)
        throw new ApiError(StatusCodes.BAD_REQUEST, "Email already exists")

      const verifyEmailToken = JwtService.generateVerifyEmailToken()

      await EmailService.sendVerificationEmail(email, verifyEmailToken)
      res.status(StatusCodes.OK).json({
        message: "Xác thực thành công"
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = AuthController
