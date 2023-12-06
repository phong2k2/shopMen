const express = require('express')
const router = express.Router()

const userController = require('../app/controllers/UserController')
const middlewareController = require('../app/middlewares/authMiddleware')
const upload = require('../app/middlewares/multerMiddlewares');
const addressController = require('../app/controllers/AddressController');

// User
router.get('/', middlewareController.authAdminMiddleWare,  userController.getAllUser)
router.get('/me', middlewareController.verifyToken, userController.getMeHandler);
router.get('/:userId', middlewareController.authUserMiddleware, userController.getDetailUser)
router.put('/:userId', middlewareController.authAdminMiddleWare, userController.updateUser)
router.delete('/:userId',middlewareController.authUserMiddleware, userController.deleteUser)

// Address user
router.get('/:userId/address',  addressController.getAllUserAddress)
router.get('/:userId/addresses/order', middlewareController.verifyToken, addressController.getAddressOrder)
router.get('/addresses/:addressId', middlewareController.verifyToken, addressController.getAddressDetail)
router.post('/addresses', middlewareController.verifyToken, addressController.createAddress)
router.put('/addresses/:addressId', middlewareController.verifyToken, addressController.updateAddress)
router.post('/addresses/:addressId/status', middlewareController.verifyToken, addressController.updateStatusAddress)
router.delete('/addresses/:addressId', middlewareController.verifyToken, addressController.deleteAddress)

module.exports = router