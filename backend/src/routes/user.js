const express = require('express')
const route = express.Router()

const userController = require('../app/controllers/UserController')
const middlewareController = require('../app/middlewares/authMiddleware')
const upload = require('../app/middlewares/multerMiddlewares');


route.get('/index', middlewareController.verifyToken,  userController.getAllUser)
route.get('/get-details/:id', middlewareController.authUserMiddleware, userController.getDetailUser)
route.put('/update-user/:id',upload.uploadSingle, middlewareController.authUserMiddleware, userController.updateUser)
route.delete('/:id',middlewareController.authUserMiddleware, userController.deleteUser)

module.exports = route