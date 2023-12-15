const express = require('express');
const router = express.Router();

const productController = require('../app/controllers/ProductController');
const middlewareController = require('../app/middlewares/authMiddleware')
const upload = require('../app/middlewares/multerMiddlewares');

router.get('/', productController.getAllProducts);
router.get('/all', productController.getAllProductsForHome);
router.get('/search', productController.searchProduct)
router.get('/:slug', productController.getProductBySlug)
router.get('/by-sub-category/:slug', productController.getProductBySubCategory)
router.get('/by-category/:slug', productController.getProductByCategory)
router.get('/related/:categoryId', productController.getListProductRelated)
router.post('/', middlewareController.authAdminMiddleWare, productController.createProduct);
router.put('/:slug', middlewareController.authAdminMiddleWare, upload.single('image'), productController.updateProduct);
router.delete('/:id', middlewareController.authAdminMiddleWare, productController.deleteProduct);



module.exports = router