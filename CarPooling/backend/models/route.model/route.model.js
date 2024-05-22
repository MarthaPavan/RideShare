const mongoose = require("mongoose");
const routeSchema = mongoose.Schema({
    routeId:{
        type:Number,
        required:true
    },
    startPoint:{
        type:String,
        required:true
    },
    endPoint:{
        type:String,
        required:true
    },
    distance:{
        type:Number,
        required:true
    }
});

const routeModel = mongoose.model("route",routeSchema);

module.exports = routeModel;