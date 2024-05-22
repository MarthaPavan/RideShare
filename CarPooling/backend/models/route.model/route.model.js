const mongoose = require("mongoose");
const routeSchema = mongoose.Schema({
    routeid:{
        type:Number,
        required:true
    },
    startpoint:{
        type:String,
        required:true
    },
    endpoint:{
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