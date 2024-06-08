const express = require("express");
const router = express.Router();
require("dotenv").config();
const {axios} = require('axios');
const MAP_API_KEY = process.env.MAP_API_KEY;

class MapApi {  

    async getAutocompletion(req, res) {

    }
}

var config = {
    method: 'get',
    url: `https://api.geoapify.com/v1/geocode/autocomplete?text=req.header.location&lang=en&limit=20&type=amenity&apiKey=${MAP_API_KEY}`,
  };
  
  axios(config)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  })