const mongoose = require("mongoose");
const employeeSchema = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobilenumber:{
        type:Number,
        required:true
    },
    vehiclemodel:{
        type:String,
        required:true
    },
    vehiclenumber:{
        type:String,
        required:true
    },
    verified:{
        type:Boolean,
        required:true
    },
    active:{
        type:Boolean,
        required:true
    }
});

const employeeModel = mongoose.model("employee",employeeSchema);

module.exports = employeeModel;