const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");


const existingUsers = require("../middlewares/existinguser")
const userModel = require("../models/users.model");
const driverModel = require("../models/drivers.model");
const adminModel = require("../models/admin.model");




const SECRET_KEY = process.env.SECRET_KEY || "mysecretkey";
require("dotenv").config();


class LoginController {




  async userLogin(req, res) {

    const { emailId, password } = req.body;


    try {


      if (req.body.isAdmin) {
        //if admin

        const admin = await adminModel.findOne({ emailId: emailId });
        console.log(admin)
        console.log(admin.password);

        const compare = await bcryptjs.compare(password, admin.password);

        if (compare) {


          const token = jwt.sign({ admin }, SECRET_KEY, { expiresIn: "24h" });

          console.log(token);

          return res.status(200).json({ role: "admin", token: token });
        }
        else {
          return res.status(500).json({ msg: "admin does not exists" });
        }

      }
      else if (req.body.isEmployee) {
        //if driver

        const user = await driverModel.findOne({ emailId });

        const compare = await bcryptjs.compare(password, user.password);

        if (compare) {

          const token = jwt.sign({ user }, SECRET_KEY, { expiresIn: "24h" });

          console.log(token);

          return res.status(200).json({ role: "driver", token: token });

        }
        else {

          return res.status(500).json({ msg: "driver does not exists" });

        }

      }
      else {
        //user

        const user = await userModel.findOne({ emailId: emailId });
        console.log(user);
        const compare = await bcryptjs.compare(password, user.password);

        if (compare) {

          const token = jwt.sign({ user }, SECRET_KEY, { expiresIn: "24h" });

          console.log(token);

          return res.status(200).json({ role: "user", token: token });

        }
        else {

          return res.status(500).json({ msg: "user does not exists" });

        }

      }

    }
    catch (err) {

      res.status(500).json({ msg: err.message });

    }

  }



  async userRegister(req, res) {
    try {

      //if user is Admin
      if (req.body.isAdmin) {


        if (existingUsers.existingAdmin) {


          const { fullName, emailId, phoneNumber, password } = req.body;
          const salt = await bcryptjs.genSalt(10);
          const hashedPassword = await bcryptjs.hash(password, salt);

          const admin = await adminModel.create({

            fullName: fullName,
            emailId: emailId,
            phoneNumber: phoneNumber,
            password: hashedPassword

          });

          return res.status(200).json({ msg: "success", admin: admin });


        }


      }
      //if user is driver
      else if (req.body.isEmployee) {


        if (existingUsers.existingDriver) {


          const { fullName, emailId, phoneNumber, password, registrationNumber, vehicleModel, isVerified } = req.body;
          const salt = await bcryptjs.genSalt(10);
          const hashedPassword = await bcryptjs.hash(password, salt);

          const driver = await driverModel.create({

            fullName: fullName,
            emailId: emailId,
            phoneNumber: phoneNumber,
            password: hashedPassword,
            registrationNumber: registrationNumber,
            vehicleModel: vehicleModel,
            isVerified: isVerified

          });

          return res.status(200).json({ msg: "success", driver: driver });


        }
      }
      else {


        if (existingUsers.existingUser) {


          const { fullName, emailId, phoneNumber, password } = req.body;
          const salt = await bcryptjs.genSalt(10);
          const hashedPassword = await bcryptjs.hash(password, salt);

          const user = await userModel.create({

            fullName: fullName,
            emailId: emailId,
            phoneNumber: phoneNumber,
            password: hashedPassword

          });

          return res.status(200).json({ msg: "success", user: user });

        }


      }



    }
    catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }
}


module.exports = new LoginController()