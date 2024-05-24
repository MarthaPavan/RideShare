const routeModel = require("../models/route.model");

class RouteControllers {
  isAdmin(req, res, next) {

  }


  async saveRoute(req, res) {
    try {
      const { routeId, startPoint, endPoint, distance } = req.body;
      const route = await routeModel.create({ routeId, startPoint, endPoint, distance });
      console.log("Inserted successfully");
      res.status(200).json({ msg: "success" });
    }
    catch (err) {
      res.status(404).json({ msg: "failed" });
    }
  }


  async editRoute(req, res) {
    try {
      const { routeId } = req.body;
      const { body } = req;
      console.log(req.body);
      await routeModel.findOneAndUpdate({ routeId: routeId }, { ...body });
      const route = routeModel.findOne({ routeId });
      res.status(200).json({ msg: "successfully updated" });
    }
    catch (err) {
      res.status(404).json({ msg: "falied to update" });
    }
  }


  async deleteRoute(req, res) {
    try {
      const routeId = parseInt(req.params.routeId);
      console.log(req.body);
      const route = await routeModel.findOneAndDelete({ routeId: routeId });
      res.status(200).json({ msg: "successfully deleted" });
    }
    catch (err) {
      res.status(404).json({ msg: "falied to delete" });
    }
  }



  async getRoute(req, res) {
    try {
      const { routeId } = req.body;
      const route = await routeModel.find({});
      res.status(200).json(route);
    }
    catch (err) {
      res.status(404).json({ msg: "falied to fetch routes" });
    }
  }



  async getRouteById(req, res) {
    try {
      const { routeId } = req.body;
      const oldRoute = await routeModel.findOne({ routeId });
      res.status(200).json({ msg: "successfully fetched" });
    }
    catch (err) {
      res.status(404).json({ msg: "falied to fetch route" });
    }
  }
}



module.exports = new RouteControllers();