
const mongoose = require('mongoose');
const userSchema = require("../models/users.model")
const {Schema} = require("mongoose");
const bookingSchema = new mongoose.Schema({

    bookingId : {
        type : Schema.ObjectId,
        required : true,
        unique : true
    },
    userDetails :{
        type : userSchema,
        required : true,
    },
    pickupLocation:{
        type : String,
        required :true
    },
    dropLocation: {
        type: String,
        required: true
    },
    date:{
        type : Date,
        required : true
    },
    seats:{
        type : Number,
        required : true
    },
    driverDetails:{
        type : driverSchema,
        required : true
    },
    status:{
        type : String,
        required : true
    },

})

const bookingModel = mongoose.model("ride",bookingSchema)
module.exports = bookingModel