const mongoose = require('mongoose');
const Booking = require('../booking.model/booking.model');
const Customer = require('../customer.model/customer.model');

const newBookingData = {
    bookingid: new mongoose.Types.ObjectId(),
    customerid: customerId,
    employeeIds: employeeIds
};

const newBooking = new Booking(newBookingData);

newBooking.save()
    .then(savedBooking => {
        console.log('Booking saved successfully:', savedBooking);
    })
    .catch(error => {
        console.error('Error saving booking:', error);
    });