const express = require('express');
const router = express.Router();
const {categoryValidation} = require('../validations/categoryValidation')


const categoryController = require('../app/controllers/CategoryController');
const middlewareController = require('../app/middlewares/authMiddleware')

router.get('/', categoryController.getAllCategories)
router.get('/:slug', categoryController.getDetailCategory)
router.get('/:id', categoryController.getCategoryDetail)
router.post('/',  categoryValidation.createNew, categoryController.createCategory)
router.put('/:id', categoryController.updateCategory)
router.delete('/:id', middlewareController.authAdminMiddleWare, categoryController.deleteCategory)


module.exports = router