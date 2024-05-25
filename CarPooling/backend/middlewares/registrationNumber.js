const userModel = require("../models/users.model");
//to check registration already exists
console.log(req.body);
const { registrationNumber } = req.body;
console.log(registrationNumber);
const valid = await userModel.findOne({
    "employeeDetails.registrationNumber": registrationNumber,
});

if (valid) {
    console.log("registrationNumber number already exists with other user");
    return res
        .status(404)
        .json({ msg: "registrationNumber number already exists with other user" });
}

