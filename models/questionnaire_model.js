const mongoose = require('mongoose');
const db = require("../util/db");

const questionnaireSchema = new mongoose.Schema({
   question: {
    type: String
    },
    answer:{
      type:String
    }
});

// Define Diet model
const QuestionnaireModel = db.model('questionnaire', questionnaireSchema);
module.exports = QuestionnaireModel;