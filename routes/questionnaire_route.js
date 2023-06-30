const express = require("express");
const router = express.Router();
const questionnaire_controller = require("../controllers/questionnaire_controller")
const verify =require("../services/request-handler")


router
    .get("/questions",questionnaire_controller.getQuestions)
    .get("/id",questionnaire_controller.getQuestionByID)
    .post("/result",questionnaire_controller.postResult)
module.exports = router; 