
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const userSchema = new mongoose.Schema({
    fullName : {
        type : String,
        required : true
    },
    emailId : {
        type : String,
        required : true
    },
    phoneNumber : {
        type : Number,
        required : true
    }
})

const driverSchema = new mongoose.Schema({
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
    },
    registrationNumber: {
      type: String,
      required: true
    },
    vehicleModel: {
      type: String,
      required: true
    }
  });
const bookingSchema = new mongoose.Schema({

    userDetails :{
        type : userSchema,
        required : true,
    },
    pickUpLocation:{
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
    capacity:{
        type : Number,
        required : true
    },
    
    status:{
        type : Boolean,
        required : true,
        default : false
    },

})

bookingSchema.plugin(AutoIncrement, { inc_field: 'bookingId' });
const bookingModel = mongoose.model("booking",bookingSchema)
module.exports = bookingModel