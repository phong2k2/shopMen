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
            console.log("🚀 ~ file: UserController.js:18 ~ getMeHandler: ~ response:", response)
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
            const userId = req.params.userId
            const urlImage = req.body.image ? req.body.image : req.file.filename 
            const infoUpdate = {
                ...req.body,
                image: urlImage
            }
        
            const response = await UserService.updateUser(userId, infoUpdate)
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