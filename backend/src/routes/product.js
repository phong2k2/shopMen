const express = require('express');
const route = express.Router();

const productController = require('../app/controllers/ProductController');
const upload = require('../app/middlewares/multerMiddlewares');

route.post('/create', upload, productController.createProduct);
route.get('/', productController.getAllProducts);
// route.get('/:id', productController.getDetailsProduct)
// route.get('/collections/:slug', productController.getProductsByCategory)
route.get('/product-detail/:slug', productController.getDetailsProduct)
route.get('/productdetail/:id', productController.getDetailsProductId)
route.post('/:id', productController.updateProduct);
route.delete('/:id', productController.deleteProduct);

module.exports = route