const mongoose = require("mongoose");
const connection = mongoose.connect("mongodb://localhost:27017/carpool");
connection.then( () =>{
    console.log("connection with carpool database is successful");
}).catch(err =>{
    console.log("connection with carpool database is unsuccessful");
});

module.exports = connection;
