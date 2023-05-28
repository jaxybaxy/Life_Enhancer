// diet level && day id

const mongoose = require('mongoose');
const db = require("../util/db");

const dietSchema = new mongoose.Schema({
  name: {
    type: String
    },
  description: {
    type: Object,
    required: true,
  }
});

// Define Diet model
const DietModel = db.model('diet_name', dietSchema);
module.exports = DietModel;