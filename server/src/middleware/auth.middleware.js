const jwt = require('jsonwebtoken')

const authUser = async(req, res, next) => {

    const token = req.cookies.token

    if(!token){
        return res.status(400).json({
            message : 'Invalid token'
        })
    }

    try {
        let decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        console.log(req.user)
        next()
    } 
    catch (error) {
        console.log(error)
    }

}

module.exports = authUser