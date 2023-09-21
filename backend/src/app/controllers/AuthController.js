const AuthService = require('../../Services/AuthService')
const cookie = require('cookie'); // Import module cookie
const JwtService = require('../../Services/JwtService')

const AuthController = {
    registerUser: async (req, res) => {
        try {
           
            const {name, email, password, confirmPassword, phone} = req.body
            const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
            const isCheckEmail = reg.test(email)
            if(!name && !email && !password && !confirmPassword && !phone) {
                return res.status(401).json({
                    status: 'Error',
                    message: 'The input is required'
                })
            }else if(!isCheckEmail) {
                return res.status(200).json({
                    status: 'ERR',
                    message: 'The input is email'
                })
            }
            // else if(password !== confirmPassword) {
            //     return res.status(200).json({
            //         status: 'ERR',
            //         message: 'The password is equal confirmPassword'
            //     })
            // }
            const response = await AuthService.registerUser(req.body)
            return res.status(200).json(response)
        }catch(err) {
            res.status(500).json({
                message: err
            })
        }
    },

    loginUser: async (req, res) => {
        try {
            const {email, password} = req.body
            const reg =  /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
            const isCheckEmail = reg.test(email);

            if(!email && !password) {
                return res.status(200).json({
                    status: 'ERR',
                    message: 'The input is required'
                })
            }else if(!isCheckEmail) {
                return res.status(200).json({
                    status: 'ERR',
                    message: 'The input is email'
                })
            }
            const response = await AuthService.loginUser(req.body)
            const { refreshToken, ...newResponse } = response
             res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: false,
                sameSite: true,
                path: "/"
            })

            res.status(200).json(newResponse)
        }catch(err) {
            res.status(500).json({
                message: err
            })
        }
    },

    // Refresh Token
    requestRefreshToken: async (req, res) => {
        try {
            const refreshToken = req.cookies.refreshToken;
            if (!refreshToken) {
                return res.status(401).json("You're not authenticated")
            }
            const response = await JwtService.requestRefreshToken(refreshToken)
            const { newAccessToken, newRefreshToken } = response
            res.cookie('refreshToken', newRefreshToken, {
                httpOnly: true,
                secure: false,
                path: '/',
                sameSite: 'strict',
            })
            res.status(200).json({
                accessToken: newAccessToken,
            })
        }catch (err) {
            res.status(500).json({
                message: err
            })
        }
    },
    // Logout 
    logOut: async (req, res) => {
        res.clearCookie('refreshToken')
        res.status(200).json("Logged out successfully!");
    }
}

module.exports = AuthController;