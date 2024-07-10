const mongoose = require('mongoose')

const dbConnect = async() =>{
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log("DB Successfully Connected");
    } catch (error) {
        console.log("DB Connection Failure : "+error);
    }
}

module.exports = dbConnect