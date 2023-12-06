const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const bcrypt = require('bcrypt')
const {env} = require('../configs/environment')
const User = require('../app/model/User')
const crypto = require("crypto");


passport.use(new GoogleStrategy({
    clientID: env.GOOGLE_AUTHORIZED_CLIENT_ID,
    clientSecret: env.GOOGLE_AUTHORIZED_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, cb) {
    try {
      if(profile?.id) {
        const existingUser = await User.findOne({oauth_id: profile.id})
        if(existingUser) {
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
          password: hash,
        })
        return cb(null, newUser)
      }
    } catch (error) {
      console.log(error)
      return cb(error)
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id); // Giả sử 'id' là định danh duy nhất trong Model User của bạn
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      done(err, null);
    });
});