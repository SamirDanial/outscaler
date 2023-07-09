const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  director: {
    type: String,
    required: true
  },
  mainCharecter: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Movie = mongoose.model('movie', MovieSchema);