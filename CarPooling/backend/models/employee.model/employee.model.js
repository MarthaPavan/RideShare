const mongoose = require("mongoose");
const employeeSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: Number,
        required: true
    },
    vehicleModel: {
        type: String,
        required: true
    },
    vehicleNumber: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
       default : false
    },
    active: {
        type: Boolean,
        default: false
    }
});

const employeeModel = mongoose.model("employee", employeeSchema);

module.exports = employeeModel;