const mongoose = require('mongoose')

const blackListSchema = new mongoose.Schema({

    token : {
        type : String,
        required : [true, "token is required"],
        unique : true
    }

}, {timestamps : true})

const blacklistModel = mongoose.model("blacklist", blackListSchema)

module.exports = blacklistModel