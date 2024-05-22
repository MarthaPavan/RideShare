const mongoose = require("mongoose");
const customerSchema = mongoose.Schema({
   customerId:{
        type:String,
        required:true
    },
    customerName:{
        type:String,
        required:true
    },
    emailId:{
        type:String,
        required:true
    },
    mobileNumber:{
        type:Number,
        required:true
    },
    status:{
        type:Boolean,
        default:false
    },
});

const customerModel = mongoose.model("customer",customerSchema);

module.exports = customerModel;