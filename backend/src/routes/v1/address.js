const express = require("express");
const router = express.Router();

const addressController = require("../../app/controllers/v1/AddressController");
const middlewareController = require("../../app/middlewares/authMiddleware");

router
  .route("/")
  .get(
    middlewareController.authAdminMiddleWare,
    addressController.getAllUserAddress
  )
  .post(addressController.createAddress);

router
  .route("/:id")
  .get(middlewareController.verifyToken, addressController.getAddressDetail)
  .put(addressController.updateAddress)
  .delete(addressController.deleteAddress);

module.exports = router;
