const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const employeeSchema = new mongoose.Schema({
  vehicleModel: {
    type: String,
    required: true,
    default: "",
  },
  vehicleNumber: {
    type: String,
    required: true,
    default: "",
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

const usersSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isEmployee: {
    type: Boolean,
    default: false,
  },
  employeeDetails: {
    type: this.isEmployee ? employeeSchema : {},
  },
});

const userModel = mongoose.model("user", usersSchema);

module.exports = userModel;
