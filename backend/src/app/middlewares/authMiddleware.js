const jwt =require("jsonwebtoken");

const middlewareController = {
    verifyToken: (req, res, next) => {

        const authHeader = req.headers['authorization'];
        console.log(authHeader)
        if(authHeader) {
            const accessToken = authHeader.split(" ")[1]
            jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
                
                if(err) {
                    return res.status(404).json({
                        message: 'The token does not exist',
                        status: 'ERROR'
                    })
                }
                req.user = user
                next()
            })
        }else {
            res.status(401).json("You're not authenticated")
        }
    },
    authUserMiddleware: (req, res, next) => {
        middlewareController.verifyToken(req, res, () => {
            if(req.user.id === req.params.id || req.user.admin) {
                next()
            }else {
                return res.status(404).json({
                    message: 'The authentication',
                    status: 'ERROR'
                })
            }
        })
    }
}

module.exports = middlewareController