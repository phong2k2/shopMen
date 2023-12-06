const express = require('express');
const router = express.Router();

const productColorController = require('../app/controllers/ProductSizeController');
const middlewareController = require('../app/middlewares/authMiddleware')

router.get('/:productId/all', productColorController.getAllSizesForProduct)
router.get('/:id', productColorController.getSizeDetail)
router.post('/', middlewareController.authAdminMiddleWare, productColorController.createSize)
router.put('/:id', middlewareController.authAdminMiddleWare, productColorController.updateSize)
router.delete('/:id', middlewareController.authAdminMiddleWare, productColorController.deleteSize)

module.exports = router