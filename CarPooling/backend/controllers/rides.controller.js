const RouteModel = require('../models/route.model');

class RideController {
  // Method to create a new ride
  async createRide(req, res) {
    try {
      const { driver, pickUpLocation, dropLocation, date, capacity } = req.body;

      // Ensure date is parsed to a JavaScript Date object
      const parsedDate = new Date(date);

      // Create a new ride using the RouteModel
      const newRide = await RouteModel.create({
        pickUpLocation: pickUpLocation,
        dropLocation: dropLocation,
        date: parsedDate,
        capacity: capacity,
        driver: [driver] // Assuming driver is an object containing driver details
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

  // Method to edit a ride
  async editRide(req, res) {
    try {
      const routeId = parseInt(req.params.routeId);
      if (isNaN(routeId)) {
        return res.status(400).json({ msg: "Invalid route ID" });
      }
      
      const { body } = req;
      if (body.date) {
        body.date = new Date(body.date);
      }

      // Check if pickup and drop locations are the same
      const existingRide = await RouteModel.findOne({ routeId: routeId });
      if (!existingRide) {
        return res.status(404).json({ msg: "Ride not found" });
      }

      if (existingRide.pickUpLocation === existingRide.dropLocation) {
        // Add new driver data to the existing driver array
        existingRide.driver.push(body.driver); // Assuming body.driver contains new driver data
      }

      // Update the ride document
      const updatedRide = await RouteModel.findOneAndUpdate(
        { routeId: routeId },
        { $set: body },
        { new: true, runValidators: true }
      );

      if (!updatedRide) {
        return res.status(404).json({ msg: "Ride not found" });
      }

      res.status(200).json(updatedRide);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  }
    // Method to delete a route
    async deleteRide(req, res) {
      try {
        const routeId = parseInt(req.params.routeId);
        if (isNaN(routeId)) {
          return res.status(400).json({ msg: "Invalid route ID" });
        }
  
        // Find the route by routeId and delete it
        const deletedRoute = await RouteModel.findOneAndDelete({ routeId: routeId });
  
        if (!deletedRoute) {
          return res.status(404).json({ msg: "Route not found" });
        }
  
        res.status(200).json({ msg: "Route deleted successfully", route: deletedRoute });
      } catch (err) {
        res.status(500).json({ msg: err.message });
      }
    }
    
    // Method to delete a driver from a route
    async deleteDriversRide(req, res) {
      try {
        const routeId = parseInt(req.params.routeId);
        if (isNaN(routeId)){
          return res.status(400).json({ msg: "Invalid route ID" });
        }
        const driverId = req.params.driverId; // Assuming driverId is passed in the URL para
        // Find the route by routeId
        const route = await RouteModel.findOne({ routeId: routeId });
  
        if (!route) {
          return res.status(404).json({ msg: "Route not found" });
        }
  
        // Filter out the driver from the driver array
        route.driver = route.driver.filter(driver => driver._id.toString() !== driverId);
  
        // Save the updated route
        await route.save();
  
        res.status(200).json({ msg: "You have cancelled your ride offering", route: route });
      } catch (err) {
        res.status(500).json({ msg: err.message });
      }
    }
}

module.exports = new RideController();
