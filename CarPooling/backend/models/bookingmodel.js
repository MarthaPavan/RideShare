
const mongoose = require('mongoose');
const userSchema = require("../models/users.model")
const AutoIncrement = require('mongoose-sequence')(mongoose);
const bookingSchema = new mongoose.Schema({

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

bookingSchema.plugin(AutoIncrement, { inc_field: 'bookingId' });
const bookingModel = mongoose.model("ride",bookingSchema)
module.exports = bookingModel