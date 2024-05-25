const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  emailId: {
    type: String,
    required: true,
    unique: [true, "emailId already exists"]
  },
  phoneNumber: {
    type: Number,
    required: true,
    unique: [true, "phone number already exists"]
  },
  password: {
    type: String,
    required: true
  }
});
const userModel = mongoose.model("user", userSchema);
module.exports = userModel;