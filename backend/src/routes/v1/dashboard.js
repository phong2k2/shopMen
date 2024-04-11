const express = require("express");
const router = express.Router();

const dashboardController = require("../../app/controllers/v1/DashboardController");

// router.route("/").get(dashboardController.homeAdmin);

// router.route("/chart").get(dashboardController.dataChart);

module.exports = router;
