const userModel = require("../models/users.model");
const driverModel = require("../models/drivers.model");
const adminModel = require("../models/admin.model");

//middleware to check existing admin
class ExistingUsers {
    async existingAdmin(req, res, next) {
        try {
            const { emailId, phoneNumber } = req.body;
            const user = await adminModel.findOne({
                $or: [
                    { emailId: emailId },
                    { phoneNumber: phoneNumber },
                ],

            });
            console.log(user)
            if (user)
                return res.status(200).json({ msg: "admin with email or phone number already exists" });
            else
                next();

        }
        catch (err) {
            res.status(500).json({ msg: err.message });
        }
    }


    //middleware to check existing driver
    async existingDriver(req, res, next) {
        try {
            const { emailId, phoneNumber } = req.body;
            const user = await driverModel.findOne({
                $or: [
                    { emailId: emailId },
                    { phoneNumber: phoneNumber },
                ],
            });
            if (user)
                return res.status(200).json({ msg: "driver with email or phone number already exists" });
            else
                next();

        }
        catch (err) {
            res.status(500).json({ msg: err.message });
        }
    }


    //middleware to check existing user / customer
    async existingUser(req, res, next) {
        try {
            const { emailId, phoneNumber } = req.body;
            const user = await userModel.findOne({
                $or: [
                    { emailId: emailId },
                    { phoneNumber: phoneNumber },
                ],
            });
            if (user)
                return res.status(200).json({ msg: "user with email or phone number already exists" });
            else
                next();

        }
        catch (err) {
            res.status(500).json({ msg: err.message });
        }
    }
}

module.exports = new ExistingUsers();