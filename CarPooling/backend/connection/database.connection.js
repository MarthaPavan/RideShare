require("dotenv").config();
const MONGO_URI = process.env.MONGO_URI | undefined;

const mongoose = require("mongoose");
const connection = mongoose.connect(
  MONGO_URI
);
connection
    .then(() => {
        console.log("connection with carpool database is successful");
    })
  .catch((err) => {
    console.log("connection with carpool database is un-successful");
  });

module.exports = connection;