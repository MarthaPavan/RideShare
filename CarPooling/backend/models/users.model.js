const mongoose = require("mongoose");
// const multer = require("multer");
const userSchema = new mongoose.Schema({
  
  image: { type: mongoose.Schema.Types.ObjectId, ref: 'Image' } // This will store the MIME type of the image
  ,
  fullName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
    unique: [true, "Phone number already exists"]
  },
  emailId: {
    type: String,
    required: true,
    unique: [true, "Email ID already exists"]
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  registrationNumber: {
    type: String,
    required:false
  },
  vehicleModel: {
    type: String,
    required:false
  },
  isVerified: {
    type: Boolean,
    default: false
  }
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
