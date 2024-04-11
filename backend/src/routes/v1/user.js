const express = require("express");
const router = express.Router();

const userController = require("../../app/controllers/v1/UserController");
const addressController = require("../../app/controllers/v1/AddressController");
const middlewareController = require("../../app/middlewares/authMiddleware");
const {
  uploadMiddleware,
  uploadImageUserMiddleware,
} = require("../../app/middlewares/multerMiddleware");

// User
router
  .route("/")
  .get(middlewareController.authAdminMiddleWare, userController.getAllUser);
router
  .route("/me")
  .get(middlewareController.verifyToken, userController.getMeHandler);
router
  .route("/:userId")
  .get(middlewareController.authUserMiddleware, userController.getDetailUser)
  .put(uploadImageUserMiddleware, userController.updateUser)
  .delete(middlewareController.authUserMiddleware, userController.deleteUser);

// Address user
// router.route("/:userId/address").get(addressController.getAllUserAddress);
// router
//   .route("/:userId/addresses/order")
//   .get(middlewareController.verifyToken, addressController.getAddressOrder);
// router
//   .route("/addresses/:addressId")
//   .get(middlewareController.verifyToken, addressController.getAddressDetail);
// router
//   .route("/addresses")
//   .post(middlewareController.verifyToken, addressController.createAddress);
// router
//   .route("/addresses/:addressId")
//   .put(middlewareController.verifyToken, addressController.updateAddress);
// router
//   .route("/addresses/:addressId/status")
//   .post(
//     middlewareController.verifyToken,
//     addressController.updateStatusAddress
//   );
// router
//   .route("/addresses/:addressId")
//   .delete(middlewareController.verifyToken, addressController.deleteAddress);

module.exports = router;
