require("dotenv").config();
const MONGO_URI = process.env.MONGO_URI;

const mongoose = require("mongoose");
const connection = mongoose.connect(
  "mongodb://127.0.0.1/carpooling"
);
connection
    .then(() => {
        console.log("connection with carpool database is successful");
    })
  .catch((err) => {
    console.log("connection with carpool database is un-successful");
  });

module.exports = connection;