const express = require("express");
const router = express.Router();
const exerciseController=require('../controllers/exercise_controller')


router.get("/allexercises",exerciseController.getAllExercises)
router.get("/exerciseid",exerciseController.getExerciseById)
router.get("/exerciselevel",exerciseController.getExerciseByLevel)

module.exports = router;