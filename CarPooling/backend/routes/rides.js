const express = require("express");
const rides  = express.Router();
const rideController = require("../controllers/rides.controller");
rides.post("/createride",rideController.createRide);
rides.get("/fetchrides",rideController.fetchRides);
rides.put("/editride/:routeId",rideController.editRide);
module.exports = rides;