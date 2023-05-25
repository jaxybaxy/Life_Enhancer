// diet level && day id

const mongoose = require('mongoose');
const db = require("../util/db");

const dietSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  }
});

// Define Diet model
const DietModel = db.model('Diet', dietSchema);
module.exports = DietModel;