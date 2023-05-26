const express = require("express");
const router = express.Router();
const todoController=require('../controllers/todo_controller')


router.post("/daily_task",todoController.dailyTask)

module.exports = router;