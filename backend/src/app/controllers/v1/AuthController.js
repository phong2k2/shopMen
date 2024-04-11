const AuthService = require('../../../services/v1/AuthService')
const JwtService = require('../../../services/v1/JwtService')
const {StatusCodes} = require('http-status-codes')
const ApiError = require('../../../utils/ApiError')
const config = require('config');


const AuthController = {
    register: async (req, res, next) => {
        try {
            const { email } = req.body
            const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
            const isCheckEmail = reg.test(email)
             if(!isCheckEmail) {
                throw new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, 'Thông tin đầu vào không phải là email hợp lệ')
            }
            const response = await AuthService.register(req.body)
            res.status(StatusCodes.OK).json(response);
        }catch(error) {
            next(error)
        }
    },

    login: async (req, res, next) => {
        try {
            const {email} = req.body
            const reg =  /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
            const isCheckEmail = reg.test(email);
            if(!isCheckEmail) {
                throw new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, 'Thông tin đầu vào không phải là email hợp lệ')
            }
            const response = await AuthService.login(req.body)
            const { refreshToken, accessToken, ...newResponse } = response
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: false,
                sameSite: false,
                path: "/"
            })
            res.cookie("accessToken", accessToken, {
                httpOnly: true,
                secure: false,
                sameSite: false,
                path: "/"
            })
            res.status(StatusCodes.OK).json(newResponse);
        }catch(error) {
            next(error)
        }
    },

    // Refresh Token
    requestRefreshToken: async (req, res, next) => {
        try {
            const refreshToken = req.cookies.refreshToken;
            if ( !refreshToken || refreshToken == 'undefined') {
                throw new ApiError(StatusCodes.UNAUTHORIZED, 'You are not authenticated')
            }
            
            const response = await JwtService.requestRefreshToken(refreshToken)
            const { newAccessToken, newRefreshToken } = response
             res.cookie('refreshToken', newRefreshToken, {
                httpOnly: true,
                secure: false,
                path: '/',
                sameSite: 'strict',
            })
            
            res.status(StatusCodes.OK).json({
                accessToken: newAccessToken,
            });
        }catch (error) {
            res.clearCookie('refreshToken', {
                httpOnly: true,
                secure: false,
                path: '/',
                sameSite: 'strict',
            });
            next(error)
        }
    },

    // Forgot Password
    forgotPassword: async (req, res, next) => {
        try {
            const {email} = req.body
            const response = await AuthService.forgotPassword(email)
            
            res.status(StatusCodes.OK).json(response);
        }catch (error) {
            next(error);
        }
    },

    resetPassword: async (req, res, next) => {
        try {
            const { userId, code} = req.query
            const {password, confirmPassword} = req.body 
            
            const response = await AuthService.resetPassword(userId, code, password)
            res.status(StatusCodes.OK).json(response);

        }catch (error) {
            next(error)
        }
    },

    // Logout 
    logOut: async (req, res) => {
        try {
            res.clearCookie('refreshToken')
            res.status(StatusCodes.OK).json({message: "Logged out successfully!"});
        }catch (error) {
            next(error)
        }
    },

    googleOauthHandler : async (req, res, next) => {
        console.log(123)
        try {
          // Get the code from the query
          const code = req.query.code ;
          const pathUrl = (req.query.state ) || '/';
          if (!code) {
            throw new Error('khong co code')
          }
      
          // Use the code to get the id and access tokens
          const { id_token, access_token } = await AuthService.getGoogleOauthToken({ code });
          
          // Use the token to get the User
          const { name, verified_email, email, picture } = await AuthService.getGoogleUser({
            id_token,
            access_token,
          });
      
          // Check if user is verified
          if (!verified_email) {
            // return next(new ApiError('Google account not verified', 403));
            throw new Error('Google account not verified')
          }
      
          // Update user if user already exist or create new user
          const user = await AuthService.findAndUpdateUser(
            { email },
            {
                username:name,
                image: picture,
                email,
                oauth_provider: 'Google',
            },
            { upsert: true, runValidators: false, new: true, lean: true }
          );

      
          if (!user){
            return res.redirect(`${config.get('origin')}/oauth/error`);
        }
          // Create access and refresh token
        const {accessToken, refreshToken} = await AuthService.signToken(user);
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: false,
            path: "/"
        })
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: false,
            sameSite: false,
            path: "/"
        })

          res.redirect(`http://localhost:5173/`);
        } catch (err) {
          console.log('Failed to authorize Google User', err);
          next(err)
        }
      }
}


module.exports = AuthController;