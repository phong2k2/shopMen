const express = require('express');
const router = express.Router();

const subCategoryController = require('../app/controllers/SubCategoryController')
const middlewareController = require('../app/middlewares/authMiddleware')
const upload = require('../app/middlewares/multerMiddlewares');

router.get('/', subCategoryController.getSubCategory)
router.get('/:id', subCategoryController.getSubCategoryDetail)
router.get('/:categoryId/category', subCategoryController.getAllSubCategoryForCategory)
router.post('/', middlewareController.authAdminMiddleWare, upload.single('image'), subCategoryController.createSubCategory)
router.put('/:id', middlewareController.authAdminMiddleWare, upload.single('image'), subCategoryController.updateSubCategory)
router.delete('/:id', middlewareController.authAdminMiddleWare, subCategoryController.deleteSubCategory)

module.exports = router