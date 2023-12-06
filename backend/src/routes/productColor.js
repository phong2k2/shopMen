const express = require('express');
const router = express.Router();

const productColorController = require('../app/controllers/ProductColorController');
const middlewareController = require('../app/middlewares/authMiddleware')
const upload = require('../app/middlewares/multerMiddlewares');

router.post('/', middlewareController.authAdminMiddleWare, productColorController.createColor)
router.get('/:productId', productColorController.getColorForProduct)
router.get('/color-detail/:id', productColorController.getColorDetail)
router.put('/:id', middlewareController.authAdminMiddleWare, productColorController.updateColor)
router.delete('/:id', middlewareController.authAdminMiddleWare, productColorController.deleteColor)

module.exports = router