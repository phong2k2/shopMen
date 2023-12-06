const {StatusCodes} = require('http-status-codes');
const jwt = require('jsonwebtoken')
const {env} = require('../configs/environment')
const ApiError = require('../utils/ApiError')
// create access token
const  generalAccessToken = (user) => {
    const accessToken = jwt.sign({
        id: user?._id,
        isAdmin: user?.isAdmin
    },
    env.JWT_ACCESS_KEY,
    {
        expiresIn: "2d"
    })
    return accessToken
}
// create refresh token
const generalRefreshToken = (user) => {
    const refreshToken = jwt.sign({
        id: user?._id,
        isAdmin: user?.isAdmin
    },
    env.JWT_REFRESH_TOKEN,
    {
        expiresIn: "7d"
    })
    return refreshToken
}

// refreshToken
const requestRefreshToken = async (refreshToken) => {
    try {
        jwt.verify(refreshToken, env.JWT_REFRESH_TOKEN, (err, user) => {
            if(error) {
                throw new ApiError(StatusCodes.Unauthorized, error.message)
            }
            const newAccessToken =  generalAccessToken(user)
            const newRefreshToken = generalRefreshToken(user)
            
            return {
                newAccessToken,
                newRefreshToken,
            }
        })
    }catch(error) {
        throw error
    }
}

module.exports = {
    generalAccessToken,
    generalRefreshToken,
    requestRefreshToken
}


