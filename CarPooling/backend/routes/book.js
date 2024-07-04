const express = require('express');
const book = express.Router();
const bookingController = require("../controllers/booking.controller");

book.post("/requestride", bookingController.createBooking);
book.delete("/requestride/:bookingId", bookingController.deleteBooking); // Added delete route

module.exports = book;
