const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  imageData: Buffer,
  contentType: String
});

module.exports = mongoose.model('Image', imageSchema);