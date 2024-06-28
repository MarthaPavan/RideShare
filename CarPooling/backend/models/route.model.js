const mongoose = require("mongoose");
const { driverSchema } = require("../models/drivers.model");
const routeSchema = mongoose.Schema({
  routeId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  pickUpLocation: {
    type: String,
    required: true,
  },
  dropLocation: {
    type: String,
    required: true,
  },
  distance:{
    type: Number,
    required: true,
  },
  date:{
    type: Date,
    required: true,
  },
  drivers: {
    type: [driverSchema],
    required: true,
  }
});
const routeModel = mongoose.model("route", routeSchema);
module.exports = routeModel;
