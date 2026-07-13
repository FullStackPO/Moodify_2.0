const userModel = require("../models/auth.model")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//register controller
async function registerController(req,res){

    const {username, email, password} = req.body

    const isUserExist = await userModel.findOne({
        $or : [{username}, {email}]
    })

    if(isUserExist){
        return res.status(400).json({
            message : 'user already exist.'
        })
    }

    const hashPassword = await bcrypt.hash(password, 10)

    const user = await userModel.create({username, email, password : hashPassword})

    const token = jwt.sign({
        id : user._id,
        username : user.username,
        email : user.email
    }, 
    process.env.JWT_SECRET, 
    {
        expiresIn : '1d'
    })

    res.cookie("token", token)

    res.status(201).json({
        message : 'user register successfully',
        id : user._id,
        username : user.username,
        email : user.email
    })

}

module.exports = registerController