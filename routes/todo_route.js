const express = require("express");
const router = express.Router();
const todoController=require('../controllers/todo_controller')
const verify =require("../services/request-handler")


router.post("/daily_task",verify.verifyToken,todoController.dailyTask)

module.exports = router;