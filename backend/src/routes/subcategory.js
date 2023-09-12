const express = require('express');
const route = express.Router();

const subCategoryController = require('../app/controllers/SubCategoryController')

route.get('/', subCategoryController.getSubCategory)
route.post('/create', subCategoryController.createSubCategory)
route.post('/:id', subCategoryController.updateSubCategory)
route.delete('/:id', subCategoryController.deleteSubCategory)

module.exports = route