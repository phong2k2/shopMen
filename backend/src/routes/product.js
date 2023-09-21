const express = require('express');
const route = express.Router();

const productController = require('../app/controllers/ProductController');
const upload = require('../app/middlewares/multerMiddlewares');

route.post('/create', upload.uploadSingle, productController.createProduct);
route.get('/', productController.getAllProducts);
route.get('/product-detail/:slug', productController.getDetailsProduct)
route.get('/product-detailId/:id', productController.getDetailsProductId)
route.put('/:id', upload.uploadSingle, productController.updateProduct);
route.delete('/:id', productController.deleteProduct);

route.get('/color/:id', productController.getProductColor)
route.post('/createColor', upload.uploadArray, productController.createColor)
route.delete('/deleteColor/:id', productController.deleteColor)

route.post('/createSize', productController.createSize)
route.get('/size/:id', productController.getProductSize)
route.delete('/deleteSize/:id', productController.deleteSize)


route.get('/search', productController.searchProduct)


module.exports = route