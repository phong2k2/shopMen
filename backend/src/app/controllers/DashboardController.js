const DashboardService = require('../../Services/DashboardService')

const DashboardController = {
    homeAdmin: async (req, res) => { 
        try {
            const response = await DashboardService.homeAdmin()
            return res.status(200).json(response)
        }catch(error) {
            res.status(404).json(error)
        }
    },
    dataChart: async (req, res) => {
        try {
            const response = await DashboardService.dataChart()
            return res.status(200).json(response)
        }catch(error) {
            res.status(404).json(error)
        }
    }
}


module.exports = DashboardController