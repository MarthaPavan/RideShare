const mongoose = require('mongoose');
const  RouteModel  = require('../models/route.model');

class RideController {
  // Method to create a new ride
  async createRide(req, res) {
    try {
      const { driver, pickUpLocation, dropLocation, date, capacity } = req.body;

      // Ensure date is parsed to a JavaScript Date object
      const parsedDate = new Date(date);

      const count = await RouteModel.countDocuments();
      // Create a new ride using the RouteModel
      const newRide = await RouteModel.create({
        routeId: count + 1, // Consider generating unique routeId if needed
        pickUpLocation: pickUpLocation,
        dropLocation: dropLocation,
        date: parsedDate,
        capacity: capacity,
        driver:{...driver} 
      });
      if (newRide) {
        return res.status(201).json({ message: "Ride created successfully", ride: newRide });
      } else {
        return res.status(400).json({ message: "Failed to create ride" });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  // Method to fetch rides based on query parameters
  async fetchRides(req, res) {
    try {
      const { date, seats } = req.query;

      // Create a query object
      let query = {};

      // Parse and add date to the query if provided
      if (date) {
        const parsedDate = new Date(date);
        query.date = parsedDate;
      }

      // Add capacity to the query if seats are provided
      if (seats) {
        query.capacity = { $gte: seats }; // Assuming we want rides with at least 'seats' capacity
      }

      // Fetch rides based on the query
      const rides = await RouteModel.find(query);

      if (rides.length === 0) {
        return res.status(404).json({ message: "No rides found" });
      }

      return res.status(200).json(rides);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
  async editRide(req, res) {
    try {
      const routeId = parseInt(req.params.routeId);
      if (isNaN(routeId)) {
        return res.status(400).json({ msg: "Invalid route ID" });
      }
      const { body } = req;
      console.log(req.body);
      if (body.date) {
        console.log(body.date)
        body.date = new Date(body.date);
      }
      const updatedRide = await RouteModel.findOneAndUpdate(
        { routeId: routeId },
        { $set: body },
        { new: true, runValidators: true }
      );
      console.log(updatedRide);
      if (!updatedRide){
        return res.status(404).json({ msg: "Ride not found" });
      }
      res.status(200).json(updatedRide);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  }
  
}

module.exports = new RideController();
