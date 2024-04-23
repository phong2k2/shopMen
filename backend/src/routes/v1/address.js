const express = require("express");
const router = express.Router();

const addressController = require("../../app/controllers/v1/AddressController");
const middlewareController = require("../../app/middlewares/authMiddleware");

router
  .route("/")
  .get(middlewareController.verifyToken, addressController.getAllUserAddress)
  .post(addressController.createAddress);

router
  .route("/:id")
  .get(middlewareController.verifyToken, addressController.getAddressDetail)
  .put(middlewareController.authUserMiddleware, addressController.updateAddress)
  .delete(
    middlewareController.authUserMiddleware,
    addressController.deleteAddress
  );

module.exports = router;
