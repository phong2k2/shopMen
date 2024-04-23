const express = require("express");
const router = express.Router();

const galleryController = require("../../app/controllers/v1/GalleryController");
const { uploadMiddleware } = require("../../app/middlewares/multerMiddleware");
const middlewareController = require("../../app/middlewares/authMiddleware");

router
  .route("/")
  .get(galleryController.getAllGalleries)
  .post(
    middlewareController.authAdminMiddleWare,
    uploadMiddleware,
    galleryController.createGallery
  );

router
  .route("/:id")
  .get(galleryController.getGalleryDetail)
  .put(
    middlewareController.authAdminMiddleWare,
    uploadMiddleware,
    galleryController.updateGallery
  )
  .delete(
    middlewareController.authAdminMiddleWare,
    galleryController.deleteGallery
  );

module.exports = router;
