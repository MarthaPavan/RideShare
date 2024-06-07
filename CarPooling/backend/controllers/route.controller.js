const routeModel = require("../models/route.model");
const driverModel = require("../models/drivers.model");

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
    } catch (err) {
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
      const routeId  = parseInt(req.params.routeId);
      console.log(routeId);
      const oldRoute = await routeModel.findOne({ routeId:routeId });
      res.status(200).json(oldRoute);
    } catch (err) {
      res.status(404).json({ msg: err.message });
    }
  }
}

module.exports = new RouteControllers();
