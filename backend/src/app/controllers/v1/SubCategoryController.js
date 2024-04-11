const SubCategoryService = require("../../../services/v1/SubCategoryService");
const { StatusCodes } = require("http-status-codes");
const pick = require("../../../utils/pick");

const SubCategoryController = {
  // Get SubCategory
  getSubCategory: async (req, res, next) => {
    try {
      const filter = pick(req.query, ["category"]);
      const options = pick(req.query, ["sortBy", "limit", "page"]);

      const response = await SubCategoryService.getSubCategory(filter, options);
      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  },

  getSubCategoryDetail: async (req, res, next) => {
    try {
      const { id } = req.params;

      const response = await SubCategoryService.getSubCategoryDetail(id);
      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  },
  //Get Sub category by Category
  getAllSubCategoryForCategory: async (req, res, next) => {
    try {
      const { categoryId } = req.params;
      const response = await SubCategoryService.getAllSubCategoryForCategory(
        categoryId
      );
      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  },

  // Add SubCategory
  createSubCategory: async (req, res, next) => {
    try {
      const { filename } = req.file;
      const { name, category } = req.body;

      const response = await SubCategoryService.createSubCategory(
        name,
        category,
        filename
      );
      res.status(StatusCodes.CREATED).json(response);
    } catch (error) {
      next(error);
    }
  },

  // Update SubCategory
  updateSubCategory: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { filename } = req.file;

      const data = req.body;
      const response = await SubCategoryService.updateSubCategory(
        id,
        data,
        filename
      );
      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  },

  // Delete SubCategory
  deleteSubCategory: async (req, res, next) => {
    try {
      const subCategoryId = req.params.id;

      const response = await SubCategoryService.deleteSubCategory(
        subCategoryId
      );
      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = SubCategoryController;
