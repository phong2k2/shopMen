const express = require('express');
const route = express.Router();

const categoryController = require('../app/controllers/CategoryController');

route.get('/', categoryController.getAllCategories)
route.get('/:id', categoryController.getACategory)
route.get('/detail/:slug', categoryController.getDetailCategory)
route.post('/create', categoryController.createCategory)
route.put('/:id', categoryController.updateCategory)
route.delete('/:id', categoryController.deleteCategory)

module.exports = route