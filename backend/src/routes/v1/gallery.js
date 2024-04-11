const express = require("express");
const router = express.Router();

const galleryController = require("../../app/controllers/v1/GalleryController");
const { uploadMiddleware } = require("../../app/middlewares/multerMiddleware");

router
  .route("/")
  .get(galleryController.getAllGalleries)
  .post(uploadMiddleware, galleryController.createGallery);

router
  .route("/:id")
  .get(galleryController.getGalleryDetail)
  .put(uploadMiddleware, galleryController.updateGallery)
  .delete(galleryController.deleteGallery);

module.exports = router;
