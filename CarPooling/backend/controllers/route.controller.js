// Importing the Route model
const {Route:routeModel } = require("../models/route.model");
const driverModel = require("../models/drivers.model");
const bookingModel = require("../models/bookingmodel");
class RouteControllers {
  async saveRoute(req, res) {
    try {
      const { routeId, startPoint, endPoint, distance } = req.body;
      const drivers = await driverModel.find({}, { fullName: 1, _id: 0, emailId: 1, phoneNumber: 1, registrationNumber: 1 });
      console.log(drivers);
      const route = await routeModel.create({
        routeId,
        startPoint,
        endPoint,
        distance,
        drivers:drivers
      });
      console.log("Inserted successfully");
      res.status(200).json(route);
    } catch (err){
      res.status(404).json({ msg: err.message });
    }
  }

  async editRoute(req, res) {
    try {
      const routeId  = parseInt(req.params.routeId);
      const { body } = req;
      console.log(req.body);
  
      await routeModel.findOneAndUpdate({ routeId: routeId }, { ...body });
      const route = await routeModel.findOne({ routeId:routeId });
      res.status(200).json(route);
    } catch (err) {
      res.status(404).json({ msg: err.message });
    }
  }

  async deleteRoute(req, res) {
    try {
      const routeId = parseInt(req.params.routeId);
      console.log(req.body);
      const route = await routeModel.findOneAndDelete({ routeId: routeId });
      const book = await bookingModel.findOneAndDelete({"routeDetails.routeId":routeId});
      res.status(200).json(route);
    } catch (err) {
      res.status(404).json({ msg: err.message });
    }
  }

  async getRoute(req, res) {
    try {
      // const {}
      const { routeId } = req.body;
      const routes = await routeModel.find();
      res.status(200).json(routes);
    } catch (err) {
      res.status(404).json({ msg: err.message });
    }
  }

  async getRouteById(req, res) {
    try {
      const routeId = parseInt(req.params.routeId); // Ensure the routeId is parsed as an integer
      console.log(routeId);
      const route = await routeModel.findOne({ routeId: routeId }); // Use findOne with routeId field

      if (!route) {
        return res.status(404).json({ msg: "Route not found" });
      }

      res.status(200).json(route);
    } catch (err) {
      console.error("Error fetching route by ID:", err);
      res.status(500).json({ msg: "Internal server error" });
    }
  }
  async getDriverRoute(req, res) {
    try {
        const driverEmail = req.params.email;
        const route = await routeModel.find({"driver.emailId": driverEmail});
        res.json(route); // Make sure to send the response
    } catch (err) {
        console.error("Error fetching route by email:", err);
        res.status(500).json({ msg: "Internal server error" });
    }
  }
  async searchRides(req, res) {
    try {
        const { pickUpLocation, dropLocation, capacity, date } = req.query;
        
        // Build the query object
        const query = {
            pickUpLocation,
            dropLocation,
            date
        };

        // Add the capacity condition
        if (capacity) {
            query.capacity = {
                $lte: 4,
                $gt: 1
            };
        }

        const routes = await routeModel.find(query);
        console.log(routes);
        res.status(202).json(routes);
    } catch (err) {
        console.error("Error searching for rides:", err);
        res.status(500).json({ err: err.message });
    }
}
}


module.exports = new RouteControllers();
