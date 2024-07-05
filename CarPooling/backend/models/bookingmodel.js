// Import necessary modules
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Route = require('../models/route.model');  // Adjust the path accordingly

// Define User Schema
const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    emailId: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    }
});

// Define Booking Schema
const bookingSchema = new mongoose.Schema({
    userDetails: {
        type: userSchema,
        required: true,
    },
    route: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Route',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        required: true,
        default: false
    }
});

bookingSchema.plugin(AutoIncrement, { inc_field: 'bookingId' });

// Create Booking Model
const Booking = mongoose.model("Booking", bookingSchema);

// Middleware to update route capacity before saving a booking
bookingSchema.pre('save', async function(next) {
    try {
        const route = await Route.findById({routeId:this.route});
        if (!route) {
            throw new Error('Route not found');
        }

        if (route.capacity < this.capacity) {
            throw new Error('Insufficient capacity for this booking');
        }

        route.capacity -= this.capacity;
        await route.save();
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = Booking;
