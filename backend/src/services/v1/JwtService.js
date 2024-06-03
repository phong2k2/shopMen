const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const { env } = require("../../configs/environment");
const ApiError = require("../../utils/ApiError");
const { totp } = require("otplib");

// create access token
const generalAccessToken = (userId, isAdmin) => {
  const accessToken = jwt.sign(
    {
      id: userId,
      isAdmin,
    },
    env.JWT_ACCESS_KEY,
    {
      expiresIn: env.EXPIRED_ACCESS_TOKEN,
    }
  );
  return accessToken;
};
// create refresh token
const generalRefreshToken = (userId, isAdmin) => {
  const refreshToken = jwt.sign(
    {
      id: userId,
      isAdmin,
    },
    env.JWT_REFRESH_TOKEN,
    {
      expiresIn: env.EXPIRED_REFRESH_TOKEN,
    }
  );
  return refreshToken;
};

const requestRefreshToken = async (refreshToken) => {
  return new Promise((resolve, reject) => {
    jwt.verify(refreshToken, env.JWT_REFRESH_TOKEN, (error, user) => {
      if (error) {
        reject(new ApiError(StatusCodes.UNAUTHORIZED, error.message));
      } else {
        const newAccessToken = generalAccessToken(user?.id, user?.isAdmin);
        const newRefreshToken = generalRefreshToken(user?.id, user?.isAdmin);
        resolve({
          newAccessToken,
          newRefreshToken,
        });
      }
    });
  });
};

const generateVerifyEmailToken = () => {
  totp.options = { step: 60, window: 1 };
  return totp.generate(env.VERIFY_EMAIL_SECRET);
};

module.exports = {
  generalAccessToken,
  generalRefreshToken,
  requestRefreshToken,
  generateVerifyEmailToken,
};
