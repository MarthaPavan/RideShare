const routeModel = require("../models/route.model");

class RouteControllers {
  isAdmin(req, res, next) {}

  async saveRoute(req, res) {}
  async editRoute(req, res) {}

  async deleteRoute(req, res) {}

  //Anyone can access
  async getRoute(req, res) {}

  async getRouteById(req, res) {}
}
module.exports = new RouteControllers();
