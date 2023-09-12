const User = require('../app/model/User');
const bcrypt = require('bcrypt')
const jwtService = require('./JwtService')


const registerUser = (newUser) => {
    return new Promise( async (resolve, reject) => {
        try {
            const { name, email, password, address, phone, image} = newUser

            const checkUser = await User.findOne({
                email: email
            })
            if (checkUser) {
               return resolve({
                    status: 'ERR',
                    message: 'The email is already'
                })
            }

            const salt = await bcrypt.genSalt(10)
            const hash = await bcrypt.hash(password, salt)   
            const checkUserName = await User.create({
                username: name,
                email,
                password: hash,
                address,
                phone,
                image
            })

            if (checkUserName) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: checkUserName
                })
            }
        }catch (err) {
            reject({
                status: 'Error',
                message: 'Failed to create User',
                error: err
            });
        }
    })
}

const loginUser = (reqAuth) => {
    return new Promise( async (resolve, reject) => {
        const {email, password} = reqAuth
        const user = await User.findOne({email: email})
        if(!user) {
            return reject('Wrong email')
        }
        const validPassword = await bcrypt.compareSync(
            password,
            user.password
        )

        if(!validPassword) {
            return reject("Wrong password")
        }
        if(user && validPassword) {
            // Access Token
            const accessToken = jwtService.generalAccessToken(user)
            // Refresh token
            const refreshToken = jwtService.generalRefreshToken(user)

            const { password, ...other} = user._doc
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: other, accessToken, refreshToken
            })
        }
    })
}
module.exports = {
    registerUser,
    loginUser
}