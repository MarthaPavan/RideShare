const { driverModel } = require("../models/drivers.model");

async function getDriver(req, res) {
  try {
    const drivers = await driverModel.find({});
    return res.status(200).json(drivers);
  } catch (err) {
    console.error('Error fetching drivers:', err);
    return res.status(500).json({ msg: err.message });
  }
}

module.exports = { getDriver };
