const express = require("express")
const router = express.Router()

const dashboardController = require("../../app/controllers/v1/DashboardController")
const middlewareController = require("../../app/middlewares/authMiddleware")

router
  .route("/")
  .get(middlewareController.authAdminMiddleWare, dashboardController.homeAdmin)

router
  .route("/chart")
  .get(middlewareController.authAdminMiddleWare, dashboardController.dataChart)

module.exports = router
