const routeModel = require("../models/route.model/route.model");


async function saveRoute(req, res) {
    try {
        const route = await routeModel.create(req.body);
        res.status(200).json(route);
    }
    catch (err) {
        res.status(404).json({ message: "Error in Inserting the route" });
    }
}


async function getRoute(req, res) {
    try {
        const routes = await routeModel.find();
        res.status(200).json(routes);
    }
    catch (err) {
        res.status(404).json({ message: "Error in finding the routes" });
    }
}


async function getRouteById(req, res) 
{
    try{
        const _id= parseInt(req.params.routeId);;
        const route = await routeModel.find({ _id });
        res.status(200).json(route);
    }
    catch (err) {
        res.status(404).json({ message: "Error in finding the route" });
    }
}


async function editRoute(req, res) {
    try {
        const _id  = parseInt(req.params.routeId);
        const { body } = req;
        const oldRoute = await routeModel.find({ _id });
        const { startPoint, endPoint, distance } = oldRoute;
        const old = await routeModel.findByIdAndUpdate({ _id }, { _id, startPoint, endPoint,distance, ...body })
        const route = await routeModel.find({ _id });
        res.status(200).json(route);
    }
    catch (err) {
        res.status(404).json({ message: "Error in Updating the route" });
    }
}


async function deleteRoute(req, res) {
    try {
        const _id = req.params.routeId;
        const route = await routeModel.findByIdAndDelete({_id});
        res.status(200).json(route);
    }
    catch (err) {
        res.status(404).json({ message: "Error in Deleting the route" });
    }
}


module.exports = { getRoute, getRouteById, editRoute, saveRoute, deleteRoute };