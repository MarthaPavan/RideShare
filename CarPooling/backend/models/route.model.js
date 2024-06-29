const mongoose = require("mongoose");
const {driverSchema} = require("./drivers.model");
const routeSchema = mongoose.Schema({
  routeId:{
    type: Number,
    required: true,
    unique : true
  },
  pickUpLocation: {
    type: String,
    required: true,
  },
  dropLocation: {
    type: String,
    required: true,
  },
  date:{
    type: Date,
    required: true,
  },
  capacity : {
    type: Number,
    required: true,
  },
  driver: {
    type: driverSchema,
    required: true,
  }
});
const routeModel = mongoose.model("route", routeSchema);
module.exports = routeModel;
