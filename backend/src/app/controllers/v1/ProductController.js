const { first } = require("lodash");
const { StatusCodes } = require("http-status-codes");
const ProductService = require("../../../services/v1/ProductService");
const pick = require("../../../utils/pick");

const checkSearchCriteriaRange = (query, key) => {
  const queryString = query;
  if (query[`${key}_min`] >= 0 && query[`${key}_max`]) {
    queryString[key] = { min: query[`${key}_min`], max: query[`${key}_max`] };
  }
  return queryString;
};

const ProductController = {
  //GetAll Products
  getAllProducts: async (req, res, next) => {
    try {
      const queryString = first(
        ["price"].map((item) => checkSearchCriteriaRange(req.query, item))
      );
      const filter = pick(queryString, [
        "category",
        "subCategory",
        "price",
        "name",
      ]);
      const options = pick(queryString, ["sortBy", "limit", "page"]);
      filter.searchCriteria = { price: "range" };
      filter.searchCriteria = { name: "like", price: "range" };
      options.populate = [
        { path: "category" },
        { path: "subCategory" },
        {
          path: "color",
          populate: [{ path: "gallery" }, { path: "size" }],
        },
      ];

      if (queryString.featured) {
        options.sortBy = "rating:desc";
      }

      if (queryString.best_selling) {
        options.sortBy = "sold:desc";
      }

      if (queryString.week_top) {
        options.sortBy = "updatedAt:desc";
      }

      if (queryString.new_top) {
        options.sortBy = "createdAt:desc";
      }

      const response = await ProductService.getAllProducts(filter, options);
      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  },

  // Get Product Details
  getProductDetail: async (req, res, next) => {
    try {
      const {
        params: { productId },
        query,
      } = req;

      const options = pick(query, ["sortBy", "limit", "page"]);
      options.populate = [
        { path: "category" },
        { path: "subCategory" },
        {
          path: "color",
          populate: [{ path: "gallery" }, { path: "size" }],
        },
      ];

      const response = await ProductService.getProductDetail(
        { _id: productId },
        options
      );
      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  },

  // Add Product
  createProduct: async (req, res, next) => {
    try {
      const response = await ProductService.createProduct(req.body);
      res.status(StatusCodes.CREATED).json(response);
    } catch (error) {
      next(error);
    }
  },

  // Upadte product
  updateProduct: async (req, res, next) => {
    try {
      const { productId } = req.params;
      const response = await ProductService.updateProduct(productId, req.body);
      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  },

  //Delete Product
  deleteProduct: async (req, res, next) => {
    try {
      const { productId } = req.params;

      const response = await ProductService.deleteProduct(productId);
      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = ProductController;
