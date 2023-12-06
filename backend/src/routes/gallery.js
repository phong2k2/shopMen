const express = require('express');
const router = express.Router();

const galleryController = require('../app/controllers/GalleryController');
const upload = require('../app/middlewares/multerMiddlewares');
const middlewareController = require('../app/middlewares/authMiddleware')

router.get('/:productId', galleryController.getAllGalleriesForProduct)
router.get('/:id/detail', galleryController.getGalleryDetail)
router.post('/', middlewareController.authAdminMiddleWare, upload.single('image'),  galleryController.createGallery)
router.put('/:id', middlewareController.authAdminMiddleWare, upload.single('image'), galleryController.updateGallery)
router.delete('/:id', middlewareController.authAdminMiddleWare,  galleryController.deleteGallery)

module.exports = router