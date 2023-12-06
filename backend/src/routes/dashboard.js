const express = require('express');
const router = express.Router();

const middlewareController = require('../app/middlewares/authMiddleware')
const dashboardController = require('../app/controllers/DashboardController')

router.get('/',middlewareController.authAdminMiddleWare, dashboardController.homeAdmin)
router.get('/chart', middlewareController.authAdminMiddleWare, dashboardController.dataChart)


module.exports = router