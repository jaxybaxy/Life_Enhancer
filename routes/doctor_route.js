const express = require("express");
const router = express.Router();
const doctorController = require("../controllers/doctor_controller")
const verify =require("../services/request-handler")


router.get("/alldoctors",doctorController.getDoctorsList)
router.get("/doctorsid",doctorController.getDoctorById)

module.exports = router;