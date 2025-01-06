const express = require("express")
const router = express.Router()

const userController = require("../../app/controllers/v1/UserController")
const middlewareController = require("../../app/middlewares/authMiddleware")
const { uploadMiddleware } = require("../../app/middlewares/multerMiddleware")

// User
router
  .route("/")
  .get(middlewareController.authAdminMiddleWare, userController.getAllUser)
router
  .route("/me")
  .get(middlewareController.verifyToken, userController.getMeHandler)
router
  .route("/:userId")
  .get(middlewareController.authUserMiddleware, userController.getDetailUser)
  .put(uploadMiddleware().single("image"), userController.updateUser)
  .delete(middlewareController.authUserMiddleware, userController.deleteUser)

module.exports = router
