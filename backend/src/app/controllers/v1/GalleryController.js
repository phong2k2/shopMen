const GalleryService = require("../../../services/v1/GalleryService");
const { StatusCodes } = require("http-status-codes");
const pick = require("../../../utils/pick");

const GalleryController = {
  getAllGalleries: async (req, res, next) => {
    try {
      const filter = pick(req.query, ["productColor"]);
      const options = pick(req.query, ["sortBy", "limit", "page"]);

      const response = await GalleryService.getAllGalleries(filter, options);
      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  },

  getGalleryDetail: async (req, res, next) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(404).json({
          status: "Error",
          message: "The id is required",
        });
      }
      const response = await GalleryService.getGalleryDetail(id);
      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  },

  createGallery: async (req, res, next) => {
    try {
      const { filename } = req.file;
      const response = await GalleryService.createGallery(req.body, filename);
      res.status(StatusCodes.CREATED).json(response);
    } catch (error) {
      next(error);
    }
  },

  updateGallery: async (req, res, next) => {
    try {
      const { filename } = req.file;
      const { id } = req.params;
      console.log(filename);
      const response = await GalleryService.updateGallery(
        id,
        req.body,
        filename
      );
      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  },

  deleteGallery: async (req, res, next) => {
    try {
      const { id } = req.params;

      const response = await GalleryService.deleteGallery(id);
      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = GalleryController;
