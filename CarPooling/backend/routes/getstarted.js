const verifyToken = require("../middlewares/token.verification");
const loginController = require("../controllers/login.controller");
const routeController = require("../controllers/route.controller");
const existingUser = require("../middlewares/existinguser");
const verifyEmployee = require("../middlewares/nodemailer");
const express = require("express");
const multer = require("multer");
const route = express.Router();

const storage = multer.memoryStorage(); // Store files in memory as Buffer objects
const upload = multer({ storage });
route.post("/login", loginController.userLogin);
route.post("/signup", upload.single('image'), loginController.userRegister);
route.post("/forgot", loginController.forgotPassword);
// route.put("/updateProfile", verifyToken, loginController.updateUserProfile);
route.get("/fetch-profile-pic/:image", loginController.fetchProfilePic);
module.exports = route;