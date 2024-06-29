const express = require('express');
const book = express.Router();
const bookingModel = require("../models/bookingmodel");
const bookingController = require("../controllers/booking.controller");
book.post("/requestride", bookingController.createBooking);

module.exports = book;
