const express = require('express');
const router = express.Router();

const addressController = require('../app/controllers/AddressController');
const middlewareController = require('../app/middlewares/authMiddleware')

router.get('/:userId/user',  addressController.getAllUserAddress)
router.get('/:id', middlewareController.verifyToken, addressController.getAddressDetail)
router.post('/', middlewareController.verifyToken, addressController.createAddress)
router.put('/:id', middlewareController.verifyToken, addressController.updateAddress)
router.delete('/:id', middlewareController.verifyToken, addressController.deleteAddress)

module.exports = router