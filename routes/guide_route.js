const express = require("express");
const router = express.Router();
const guide_controller = require("../controllers/guide_controller")
const verify =require("../services/request-handler")


router
    .get("/",guide_controller.getGuide)

module.exports = router; 