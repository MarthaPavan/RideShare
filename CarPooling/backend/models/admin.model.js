const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: Number,
        required: true,
        unique: [true, "phone number already exists"]
    },
    emailId: {
        type: String,
        required: true,
        unique: [true, "emailId already exists"]
    },
    password: {
        type: String,
        required: true
    },

});

const adminModel = new mongoose.model("admin", adminSchema);

module.exports = adminModel;
