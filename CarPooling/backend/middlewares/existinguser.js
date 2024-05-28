const userModel = require("../models/users.model");
// const driverModel = require("../models/drivers.model");
// const adminModel = require("../models/admin.model");



//middleware to check existing user
class ExistingUsers {
    async existingUser(req, res, next) {
        try {
            const { emailId } = req.body;
            const user = await userModel.findOne({emailId});
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