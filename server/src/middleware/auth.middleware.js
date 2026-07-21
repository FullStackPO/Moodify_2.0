const jwt = require('jsonwebtoken')
const blacklistModel = require('../models/blacklist.model')
const redis = require('../config/cache')

const authUser = async(req, res, next) => {

    const token = req.cookies.token

    if(!token){
        return res.status(400).json({
            message : 'Invalid token'
        })
    }

    const isblackListed = await redis.get(token)
    
    if(isblackListed){
        return res.status(401).json({
            message : 'Inappropriate login.'
        })
    }

    try {
        let decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } 
    catch (error) {
        console.log(error)
    }

}

module.exports = authUser