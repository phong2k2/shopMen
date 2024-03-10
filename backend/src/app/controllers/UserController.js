const UserService = require('../../Services/UserService')
const {StatusCodes} = require('http-status-codes');

const UserController = {
    getAllUser: async (req, res, next) => {
        try {
            const response = await UserService.getAllUser()
            res.status(StatusCodes.OK).json(response);
        }catch(error) {
            next(error)
        }
    },

    getMeHandler: async (req, res, next) => {
        try {
            const userId = req.user.id
            const response = await UserService.getDetailUser(userId)
            const accessToken = req.cookies.accessToken
            const newRes = {
                ...response,
                accessToken
            }
            res.status(StatusCodes.OK).json(newRes);
          } catch (error) {
            next(error);
          }
    },

    getDetailUser: async (req, res, next) => {
        try {
            const { userId } = req.params;
            
            const response = await UserService.getDetailUser(userId)
            res.status(StatusCodes.OK).json(response);
        }catch(error) {
            next(error)
        }
    },
    updateUser: async (req, res, next) => {
        try {
            const fileData = req.file

            console.log("🚀 ~ file: UserController.js:43 ~ fileData:", fileData)
            const userId = req.params.userId

            const response = await UserService.updateUser(userId, req.body, fileData)

            console.log("🚀 ~ file: UserController.js:51 ~ response:", response)
            res.status(StatusCodes.OK).json(response);
        }catch(error) {
            next(error)
        }
    },
    deleteUser: async (req, res, next) => {
        try {
            const id = req.params.userId
            
            const response = await UserService.deleteUser(id)
            res.status(StatusCodes.OK).json(response);
        }catch(error) {
            next(error)
        }
    }
}

module.exports = UserController