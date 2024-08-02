const passport = require("passport")
const { totp } = require("otplib")
const { env } = require("../../configs/environment")

const middlewareController = {
  // Middleware xác thực token
  verifyToken: (req, res, next) => {
    passport.authenticate(
      "jwt-access",
      { session: false },
      (error, user, info) => {
        if (info && !error) {
          let message
          switch (info.message) {
            case "No auth token":
              message = "Please authenticate"
              break
            case "jwt expired":
              message = "The token has expired"
              break
            default:
              message = "The token is invalid"
          }
          return res.status(401).json({ message })
        }
        req.user = user
        next()
      }
    )(req, res, next)
  },

  authUserMiddleware: (req, res, next) => {
    middlewareController.verifyToken(req, res, () => {
      if (req.user.id === req.params.id || req.user.isAdmin) {
        next()
      } else {
        return res.status(403).json({
          message: "You're not allowed to delete others"
        })
      }
    })
  },

  authAdminMiddleWare: (req, res, next) => {
    middlewareController.verifyToken(req, res, () => {
      if (req.user.isAdmin) {
        next()
      } else {
        return res.status(403).json("You're not allowed to do that!")
      }
    })
  },

  verifyEmail: (req, res, next) => {
    const { code } = req.body
    if (code) {
      const isValid = totp.check(code, env.VERIFY_EMAIL_SECRET)

      if (isValid) {
        next()
      } else {
        return res.status(422).json({
          message: "OTP không tồn tại"
        })
      }
    } else {
      return res.status(422).json({
        message: "Vui lòng x5ác nhận email"
      })
    }
  }
}

module.exports = middlewareController
