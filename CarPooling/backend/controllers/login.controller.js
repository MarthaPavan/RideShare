const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/users.model");
const driverModel = require("../models/drivers.model");
const Image = require("../models/imageModel");
const multer = require("multer");
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY || "mysecretkey";


// Multer configuration for storing images
const storage = multer.memoryStorage(); // Store files in memory as Buffer objects
const upload = multer({ storage });

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
      if (!req.file) {
        return res.status(400).json({ msg: "No file uploaded." });
      }

      const { buffer, mimetype } = req.file;

      // Create new Image document
      const newImage = new Image({
        imageData: buffer,
        contentType: mimetype
      });
      const savedImage = await newImage.save();

      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);
      if (role == "driver") {
      
        const user = await userModel.create({
          image: savedImage._id ,// Reference to saved image
          fullName,
          emailId,
          phoneNumber,
          password: hashedPassword,
          role,
          registrationNumber,
          vehicleModel
        });
        await user.save();

        const driver = await driverModel.create({
          image: savedImage._id ,// Reference to saved image
          fullName,
          emailId,
          phoneNumber,
          role,
          registrationNumber,
          vehicleModel
        });
        await driver.save();
        return res.status(200).json({ msg: "success", user });
      }
      
      const user = await userModel.create({
          image: savedImage._id, // Reference to saved image,
          fullName,
          emailId,
          phoneNumber,
          password: hashedPassword,
          role
        });
       await user.save();
        return res.status(200).json({ msg: "success", user });
      
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }
}

module.exports = new LoginController();
