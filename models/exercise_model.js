const mongoose = require('mongoose');
const db = require("../util/db");

const exerciseSchema = new mongoose.Schema({
  Title: {
    type: String,
    required: true
  },
  URL: {
    type: String,
    required: true
  },
  Thumbnail: {
    type: String,
    required: true
  },
  Level: {
    type: Number,
    required: true
  }
});

// Define Diet model
const ExerciseModel = db.model('exercise', exerciseSchema);
module.exports = ExerciseModel;