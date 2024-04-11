const express = require("express");
const productRoute = require("./product");
const Router = express.Router();

Router.use("/products", productRoute);

module.exports = { ADMIN_API: Router };
