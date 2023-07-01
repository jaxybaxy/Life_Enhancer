const mongoose = require('mongoose');
const db = require("../util/db");

const guideSchema = new mongoose.Schema({
  guide: {
    type: String,
    required: true
  }
});

// Define Diet model
const GuidesModel = db.model('guide', guideSchema);
module.exports = GuidesModel;