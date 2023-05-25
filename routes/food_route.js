const express = require("express");
const router = express.Router();
const foodController=require('../controllers/food_controller')


router.get("/getfood",foodController.getfood)


module.exports = router;