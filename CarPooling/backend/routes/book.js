const express = require('express');
const book = express.Router();
const bookingController = require("../controllers/booking.controller");

book.post("/requestride", bookingController.createBooking);
book.delete("/deleteride/:bookingId", bookingController.deleteBooking); // Added delete route
book.get("/getrides",bookingController.getBooking);
book.get("/getride/:emailId",bookingController.getBookingById);
module.exports = book;
