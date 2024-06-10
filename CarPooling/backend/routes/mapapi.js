const express = require("express");
const router = express.Router();
require("dotenv").config();
const {axios} = require('axios');
const MapApiController = require("../controllers/mapapi.controllers");


router.get("/autocomplete", MapApiController.autoComplete);


module.exports = router;