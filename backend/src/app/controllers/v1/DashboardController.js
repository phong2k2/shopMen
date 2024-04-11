const DashboardService = require("../../../services/v1/DashboardService");
const { StatusCodes } = require("http-status-codes");

const DashboardController = {
  homeAdmin: async (req, res, next) => {
    try {
      const response = await DashboardService.homeAdmin();
      return res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  },
  dataChart: async (req, res) => {
    try {
      const response = await DashboardService.dataChart();
      return res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = DashboardController;
