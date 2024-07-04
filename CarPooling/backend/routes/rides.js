const express = require("express");
const rides  = express.Router();
const rideController = require("../controllers/rides.controller");
rides.post("/createride",rideController.createRide);
rides.get("/fetchrides",rideController.fetchRides);
rides.put("/editride/:routeId",rideController.editRide);
rides.delete("/deleteride/:routeId",rideController.deleteRide);

// rides.delete("/delete_drivers_ride/:driverId",rideController.deleteDriversRide);
module.exports = rides;