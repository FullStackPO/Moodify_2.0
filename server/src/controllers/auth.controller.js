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

//login controller
async function loginController(req,res){

    const {username, email, password} = req.body

    const user = await userModel.findOne({
        $or : [{username} , {email}]
    }).select("+password")

    if(!user){
        return res.status(401).json({
            message : 'Invalid Credentials'
        })
    }
    
    const hashPassword = await bcrypt.compare(password , user.password)

    if(!hashPassword){
        return res.status(400).json({
            message : 'Invalid Credentials'
        })
    }

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

    res.status(200).json({
        message : 'Login Successfully',
        id : user._id,
        username : user.username,
        email : user.email
    })

}

//getMe controller
async function getMe(req,res){

    const user = await userModel.findById(req.user.id).select("-password")

    res.status(200).json({
        user
    })
}

module.exports = { registerController, loginController, getMe }