const express = require("express");
const router = express.Router();
const diet_controller = require("../controllers/diet_controller")
// const verify =require("../services/request-handler")


router.get("/today",diet_controller.getDietForToday)
router.get("/food_id",diet_controller.getDietById)
router.get("/diet_name",diet_controller.getAllDiets)
router.get("/select_diet",diet_controller.appropriateDiet)

module.exports = router;