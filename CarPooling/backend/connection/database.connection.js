const mongoose = require("mongoose");
const connection = mongoose.connect("mongodb://127.0.0.1:27017/carpool");
connection.then( () =>{
    console.log("connection with carpool database is successful");
}).catch(err =>{
    console.log("connection with carpool database is un-successful");
});
module.exports = connection;