const express = require("express");
const router = express.Router();
const userController = require("../controllers/user_controller")
const verify =require("../services/request-handler")
router.post("/signup", userController.signUp)
// router.post("/gmailAuth", userController.signInWithGoogle)
router.post("/login", userController.logIn)
router.post("/update", userController.updateUser)
router.get("/allUsers", userController.getAllUsers)
router.get("/:userid",verify.verifyToken, userController.getUserById)
router.delete("/delete",userController.deleteUserById)
module.exports = router;