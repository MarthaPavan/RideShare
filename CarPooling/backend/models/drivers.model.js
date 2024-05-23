const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema({
  driverName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  regNumber: {
    type: String,
    required: true,
  },
  vehicleModel: {
    type: String,
  },
});

const driverModel = new mongoose.model("driver", driverSchema);

module.exports = { driverSchema, driverModel };
