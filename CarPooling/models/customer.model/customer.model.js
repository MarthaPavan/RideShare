const mongoose = require("mongoose");
const customerSchema = mongoose.Schema({
   customerid:{
        type:String,
        required:true
    },
    customername:{
        type:String,
        required:true
    },
    emailid:{
        type:String,
        required:true
    },
    mobilenumber:{
        type:Number,
        required:true
    },
    status:{
        type:Boolean,
        required:true,
        default:false
    },
});

const customerModel = mongoose.model("customer",customerSchema);

module.exports = customerModel;