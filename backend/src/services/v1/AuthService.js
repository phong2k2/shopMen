const { StatusCodes } = require("http-status-codes")
const bcrypt = require("bcrypt")
const nodemailer = require("nodemailer")
const User = require("../../app/model/User")
const jwtService = require("./JwtService")
const jwt = require("jsonwebtoken")
const { env } = require("../../configs/environment")
const ApiError = require("../../utils/ApiError")

const register = async (newUser) => {
  try {
    const { name, email, password, phone } = newUser
    const checkUser = await User.findOne({
      email: email
    })
    if (checkUser) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Email đã tồn tại")
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    const user = await User.create({
      username: name,
      email,
      password: hash,
      phone,
      isEmailVerified: true
    })

    return {
      data: user
    }
  } catch (error) {
    throw error
  }
}

const login = async (reqAuth) => {
  const { email, password } = reqAuth
  const user = await User.findOne({ email: email, oauth_provider: null })

  if (!user) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Thông tin đăng nhập sai")
  }
  const validPassword = await bcrypt.compareSync(password, user.password)

  if (!validPassword) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Thông tin đăng nhập sai")
  }
  if (user && validPassword) {
    const { accessToken, refreshToken } = createJwt(user)

    const { password, ...other } = user._doc

    return {
      data: other,
      meta: { accessToken, refreshToken }
    }
  }
}

const forgotPassword = async (email) => {
  try {
    const user = await User.findOne({ email: email })
    if (!user) {
      throw new ApiError(
        StatusCodes.NOT_FOUND,
        "Không có tài khoản với email này"
      )
    }

    const token = jwtService.generalAccessToken(user)
    // Gửi mail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      auth: {
        user: env.USER_EMAIL,
        pass: env.PASSWORD_EMAIL
      }
    })

    var mailOptions = {
      from: env.USER_EMAIL,
      to: email,
      subject: "Reset Password Link",
      text: `${env.API_LOCAL_URL}/reset-password?userId=${user._id}&code=${token}`
    }
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        throw new ApiError(StatusCodes.NOT_FOUND, error.message)
      } else {
        return { message: "Success" }
      }
    })
    return {
      message: "Vui lòng kiểm tra email"
    }
  } catch (error) {
    throw error
  }
}

const resetPassword = async (userId, code, password) => {
  try {
    jwt.verify(code, env.JWT_ACCESS_KEY, (error, user) => {
      if (error) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, error.message)
      }
    })
    const user = await User.findOne({ _id: userId })
    if (!user) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Tài khoản không tồn tại")
    }
    const checkDuplicatePassword = await bcrypt.compareSync(
      password,
      user.password
    )
    if (checkDuplicatePassword) {
      throw new ApiError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        "Mật khẩu mới không được trùng với mật khẩu cũ"
      )
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    await User.findByIdAndUpdate({ _id: userId }, { password: hash })
    return {
      message: "Tạo lại mật khẩu thành công"
    }
  } catch (error) {
    throw error
  }
}

const findAndUpdateUser = async (query, update, options) => {
  return await User.findOneAndUpdate(query, update, options)
}

const requestRefreshToken = async (refreshToken) => {
  return new Promise((resolve, reject) => {
    jwt.verify(refreshToken, env.JWT_REFRESH_TOKEN, (error, user) => {
      if (error) {
        reject(new ApiError(StatusCodes.UNAUTHORIZED, error.message))
      } else {
        const { accessToken, refreshToken } = createJwt(user)
        resolve({
          accessToken,
          refreshToken
        })
      }
    })
  })
}

const createJwt = (user) => {
  // Access Token
  const accessToken = jwtService.generalAccessToken(user)
  // Refresh token
  const refreshToken = jwtService.generalRefreshToken(user)

  return {
    accessToken,
    refreshToken
  }
}

module.exports = {
  register,
  login,
  forgotPassword,
  resetPassword,
  findAndUpdateUser,
  requestRefreshToken,
  createJwt
}
