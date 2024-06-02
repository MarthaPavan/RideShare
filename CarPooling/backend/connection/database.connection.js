require("dotenv").config();
const MONGO_URI = process.env.MONGO_URI;

const mongoose = require("mongoose");
const connection = mongoose.connect("mongodb+srv://nithineruventi:rideshare%401@cluster0.yde6xe4.mongodb.net/carpooling");
connection.then( () =>{
    console.log("connection with carpool database is successful");
}).catch(err =>{
    console.log("connection with carpool database is un-successful");
});

module.exports = connection;