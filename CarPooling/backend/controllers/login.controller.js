const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/users.model");
const driverModel = require("../models/drivers.model");
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY || "mysecretkey";

class LoginController {
  async userLogin(req, res) {
    const { emailId, password } = req.body;

    try {
      const user = await userModel.findOne({ emailId });
      if (!user) {
        return res.status(401).json({ msg: "User not found" });
      }
      const compare = await bcryptjs.compare(password, user.password);
      if (compare) {
        const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: "24h" });
        return res.status(200).json({ role: user.role, token: token, user: user });
      } else {
        return res.status(401).json({ msg: "Incorrect emailId or password" });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }

  async userRegister(req, res) {
    try {
      const { fullName, emailId, password, phoneNumber, role, registrationNumber, vehicleModel } = req.body;

      const existingUser = await userModel.findOne({ emailId });
      if (existingUser) {
        return res.status(400).json({ msg: "User already exists" });
      }

      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);
      let user;

      if (role === "driver") {
        user = await userModel.create({
          fullName,
          emailId,
          phoneNumber,
          password: hashedPassword,
          role,
          registrationNumber,
          vehicleModel
        });

        await driverModel.create({
          fullName,
          emailId,
          phoneNumber,
          role,
          registrationNumber,
          vehicleModel
        });
      } else {
        user = await userModel.create({
          fullName,
          emailId,
          phoneNumber,
          password: hashedPassword,
          role
        });
      }

      return res.status(200).json({ msg: "success", user });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }

  async updateUserProfile(req, res) {
    const { fullName, emailId, phoneNumber,role, registrationNumber, vehicleModel } = req.body;

    try {
      const userId = req.user._id; 
      console.log(userId);

      const updatedUser = await userModel.findByIdAndUpdate(
        userId,
        { fullName, emailId, phoneNumber, registrationNumber, vehicleModel },
        { new: true }
      );

      if (updatedUser.role === "driver") {
        await driverModel.findOneAndUpdate(
          { emailId },
          { fullName, phoneNumber, registrationNumber, vehicleModel }
        );
      }
      if(role==='user'){
        await userModel.findOneAndUpdate(
          { emailId },
          { fullName, phoneNumber }
          );
      }
      return res.status(200).json({ msg: "Profile updated successfully", user: updatedUser });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }
}

module.exports = new LoginController();
