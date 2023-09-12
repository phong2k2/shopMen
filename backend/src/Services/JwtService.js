const jwt = require('jsonwebtoken')

// create access token
const  generalAccessToken =  (user) => {
    const accessToken = jwt.sign({
        id: user?._id,
        admin: user?.admin
    },
    process.env.JWT_ACCESS_KEY,
    {
        expiresIn: "10d"
    })
    return accessToken
}
// create refresh token
const generalRefreshToken = (user) => {
    const refreshToken = jwt.sign({
        id: user?._id,
        admin: user?.admin
    },
    process.env.JWT_REFRESH_TOKEN,
    {
        expiresIn: "30d"
    })
    return refreshToken
}

// refreshToken
const requestRefreshToken = (refreshToken) => {
   return new Promise( async (resolve, reject) => {
    try {
        jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN, (err, user) => {
            if(err) {
                return resolve({
                    message: 'The authentication',
                    status: 'ERROR'
                })
            }
            const newAccessToken =  generalAccessToken(user)
            const newRefreshToken =  generalRefreshToken(user)
    
            resolve({
                newAccessToken,
                newRefreshToken,
            })
    
        })
    }catch(err) {
        reject({
            status: 404,
            error: err
        })
    }
   })
}

module.exports = {
    generalAccessToken,
    generalRefreshToken,
    requestRefreshToken
}


