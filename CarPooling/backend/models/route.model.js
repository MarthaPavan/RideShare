const mongoose = require("mongoose");
const { driverSchema } = require("../models/drivers.model");
const routeSchema = mongoose.Schema({
  routeId: {
    type: Number,
    required: true,
  },
  startPoint: {
    type: String,
    required: true,
  },
  endPoint: {
    type: String,
    required: true,
  },
  distance: {
    type: Number,
    required: true,
  },
  drivers: {
    type: [driverSchema],
    default: [],
  },
});

const routeModel = mongoose.model("route", routeSchema);
module.exports = routeModel;
