const express = require('express');
const route = express.Router();

const subCategoryController = require('../app/controllers/SubCategoryController')

route.get('/', subCategoryController.getSubCategory)
route.get('/:id', subCategoryController.getDetailSubCategory)
route.get('/category/:id', subCategoryController.getSubCategoryByCategory)
route.post('/create', subCategoryController.createSubCategory)
route.put('/:id', subCategoryController.updateSubCategory)
route.delete('/:id', subCategoryController.deleteSubCategory)

module.exports = route