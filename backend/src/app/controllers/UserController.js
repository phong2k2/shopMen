const UserService = require('../../Services/UserService')
const UserController = {
    getAllUser: async (req, res) => {
        try {
            const response = await UserService.getAllUser()
            res.status(200).json(response)
        }catch(err) {
            res.status(500).json({
                message: err
            })
        }
    },
    getDetailUser: async (req, res) => {
        try {
            const userId = req.params.id;
            if(!userId) {
                return res.status(404).json({
                    status: 404,
                    message: 'The userId is required'
                })
            }
            const response = await UserService.getDetailUser(userId)
            return res.status(200).json(response)
        }catch(err) {
            return res.status(500).json({
                message: err
            })
        }
    },
    updateUser: async (req, res) => {
        try {
            const urlImage = req.body.image ? req.body.image : req.file.filename 
            const infoUpdate = {
                ...req.body,
                image: urlImage
            }
            const userId = req.params.id
        if (!userId) {
            return res.status(401).json({
                status: 'ERR',
                message: 'The userId is required'
            })
        }
        const response = await UserService.updateUser(userId, infoUpdate)
        return res.status(200).json(response)
        }catch(err) {
            return res.status(500).json(err)
        }
    },
    deleteUser: async (req, res) => {
        try {
            const id = req.params.id
            if(!id) {
                return res.status(404).json({
                    status: 404,
                    message: 'Id product not found'
                })
            }

            const response = await UserService.deleteUser(id)
            res.status(200).json(response)
        }catch(err) {
            res.status(500).json({
                message: err
            })
        }
    }
}

module.exports = UserController