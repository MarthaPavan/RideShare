const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/users.model");
const {driverModel} = require("../models/drivers.model");
const Image = require("../models/imageModel");
const multer = require("multer");
require("dotenv").config();
const { Readable } = require("stream");
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
      // console.log(image.imageData)
      const compare = await bcryptjs.compare(password, user.password);
      if (compare) {
        const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: "24h" });
        return res.status(200).json({ role: user.role, token: token, user: user});
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
  
      let savedImage = null;
      if (req.file) {
        const { buffer, mimetype } = req.file;
  
        // Create new Image document
        const newImage = new Image({
          imageData: buffer,
          contentType: mimetype
        });
        savedImage = await newImage.save();
      }
  
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);
  
      if (role == "driver") {
        const user = await userModel.create({
          image: savedImage ? savedImage._id : undefined, // Reference to saved image if exists
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
          image: savedImage ? savedImage._id : undefined, // Reference to saved image if exists
          fullName,
          emailId,
          phoneNumber,
          role,
          registrationNumber,
          vehicleModel
        });
        await driver.save();
        
        return res.status(200).json({ msg: "success", user, imageData: savedImage ? savedImage.imageData : null });
      }
  
      const user = await userModel.create({
        image: savedImage ? savedImage._id : undefined, // Reference to saved image if exists
        fullName,
        emailId,
        phoneNumber,
        password: hashedPassword,
        role
      });
      await user.save();
  
      return res.status(200).json({ msg: "success", user, imageData: savedImage ? savedImage.imageData : null });
  
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }
  

  async fetchProfilePic(req,res){
    try{
      // console.log(req.params)
      const {image} = req.params;
      // console.log(image)
      const img = await Image.findById(image);
      // console.log(img) 
      res.set("Content-Type", img.contentType);
      const stream = new Readable();
      stream.push(img.imageData);
      stream.push(null);
      stream.pipe(res);
      res.status(200);
    }catch(err){
      // console.log(err.message)
      return res.status(500).json({ msg: err.message });
    }
  }
}

module.exports = new LoginController();
