const mongoose = require('mongoose')

const users = new mongoose.Schema({

    username : {
        type : String,
        required : [true, "Username is required."],
        unique : [true, "Username must be unique."],
        trim : true
    },

    email : {
        type : String,
        required : [true, "email is required"],
        unique : [true, "email must be unique"],
        trim : true
    },

    password : {
         type : String,
         required : [true, "password is required"],
         trim : true,
         select : false
    }
    
}, {timestamps : true})

const userModel = mongoose.model("users", users)

module.exports = userModel