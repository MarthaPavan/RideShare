const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema({
  image: { type: mongoose.Schema.Types.ObjectId, ref: 'Image' },
  fullName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
  },
  registrationNumber: {
    type: String,
    required: true,
    unique: true,
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

const driverModel = mongoose.model("driver", driverSchema);

module.exports = {
  driverModel: driverModel,
  driverSchema: driverSchema
};
