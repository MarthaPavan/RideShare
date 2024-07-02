const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

// Driver schema without unique constraint on phoneNumber
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

// Route schema with auto-incrementing routeId
const routeSchema = new mongoose.Schema({
  pickUpLocation: {
    type: String,
    required: true
  },
  dropLocation: {
    type: String,
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
  driver: {
    type: driverSchema,
    required: true
  }
});

routeSchema.plugin(AutoIncrement, { inc_field: 'routeId' });

const Route = mongoose.model("Route", routeSchema);
module.exports = Route;
