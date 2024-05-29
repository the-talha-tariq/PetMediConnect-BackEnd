const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`Mongo Connected`.bgGreen.white)
    }
    catch(error){
        console.log(`Mongo Server Issue ${error}`.bgRed.white)
    }
}

module.exports = connectDB;