const mongoose = require('mongoose')

const connectToDB = async() => {

    try {
        await mongoose.connect(process.env.MONGO_URI)
        await console.log('connected to db.')
    } 
    catch (error) {
        console.log(error)
    }
    
}

module.exports = connectToDB