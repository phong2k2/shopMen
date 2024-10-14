const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth20").Strategy
const JwtStrategy = require("passport-jwt").Strategy
const ExtractJwt = require("passport-jwt").ExtractJwt
const bcrypt = require("bcrypt")
const { env } = require("../configs/environment")
const User = require("../app/model/User")
const crypto = require("crypto")

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: env.JWT_ACCESS_KEY
}

const jwtStrategy = new JwtStrategy(jwtOptions, async function (payload, done) {
  try {
    const user = await User.findById({ _id: payload.id })
    if (!user) {
      return done(null, false)
    }
    done(null, user)
  } catch (error) {
    done(error, false)
  }
})

const googleStrategy = new GoogleStrategy(
  {
    clientID: env.GOOGLE_AUTHORIZED_CLIENT_ID,
    clientSecret: env.GOOGLE_AUTHORIZED_CLIENT_SECRET,
    callbackURL: env.APP_URL + env.GOOGLE_AUTHORIZED_REDIRECT_URI
  },
  async function (accessToken, refreshToken, profile, cb) {
    try {
      if (profile?.id) {
        const existingUser = await User.findOne({ oauth_id: profile.id })
        if (existingUser) {
          return cb(null, existingUser)
        }
        const password = crypto.randomBytes(8).toString("hex")
        const salt = await bcrypt.genSalt(5)
        const hash = await bcrypt.hash(password, salt)

        // Nếu không có user trong db thì thêm vào
        const newUser = await User.create({
          username: profile.displayName,
          oauth_provider: profile.provider,
          oauth_id: profile.id,
          email: profile.emails[0]?.value,
          image: profile.photos[0]?.value,
          password: hash
        })
        return cb(null, newUser)
      }
    } catch (error) {
      return cb(error)
    }
  }
)

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => {
      done(null, user)
    })
    .catch((err) => {
      done(err, null)
    })
})

module.exports = {
  jwtStrategy,
  googleStrategy
}
