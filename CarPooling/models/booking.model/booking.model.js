const mongoose = require('mongoose');
const Employee = require('../employee.model/employee.model');
const Customer = require('../customer.model/customer.model');


const bookingSchema = new mongoose.Schema({
    bookingid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true
    },
    customerid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    employeeIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    }]
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
