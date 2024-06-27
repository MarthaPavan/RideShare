const mongoose = require('mongoose');
const Ride = require('../models/ride.model');
const Driver = require('../models/driver.model');
const User = require('../models/user.model');
const express = require('express');
const ride = express.Router();

//ride search based on user's query

ride.get('/searchRide',fetchRides);