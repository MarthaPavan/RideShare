const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
    unique: [true, "phone number already exists"],
  },
  emailId: {
    type: String,
    required: true,
    unique: [true, "emailId already exists"],
  },
  registrationNumber: {
    type: String,
    required: true,
    unique: [true, "registration number already exists"],
  },
  vehicleModel: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

const driverModel = new mongoose.model("driver", driverSchema);

module.exports = {driverModel,driverSchema};
