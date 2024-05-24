require("dotenv").config();
const MONGO_URI = process.env.MONGO_URI;

const mongoose = require("mongoose");
const connection = mongoose.connect(`${MONGO_URI}/carpool`);
connection
  .then(() => {
    console.log("connection with carpool database is successful");
  })
  .catch((err) => {
    console.log("connection with carpool database is unsuccessful");
  });

module.exports = connection;
