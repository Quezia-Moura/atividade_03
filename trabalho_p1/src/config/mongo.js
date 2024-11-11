const mongoose = require("mongoose");
require("dotenv").config();

const connectMONGODB = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true, 
            useUnifiedTopology: true
        })
        console.log("Mongo DB conectado")
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}

module.exports = connectMONGODB;
