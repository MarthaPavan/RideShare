const driverModel = require("../models/drivers.model");




async function getDriver(req, res) {
    try
    {
        console.log(req.method);
        const drivers = await driverModel.find({});
        return res.status(200).json(drivers);
    }
    catch (err)
    {
        return res.status(500).json({ msg: err.message });
    }
}

module.exports = {getDriver};