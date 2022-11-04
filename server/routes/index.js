const express = require('express');
const AuthController = require("../controllers/authControllser");
const conversationController = require('../controllers/conversationController');
const messageController = require('../controllers/messageController');

const router = express.Router();


// auth
router.post("/register",AuthController.register)
router.post("/login",AuthController.login)
router.get("/user/:id",AuthController.getOne)
router.get("/users",AuthController.getAll)


// conversation 
router.post("/conversation", conversationController.create)
router.get("/conversation/:userId", conversationController.getConversation)


// message
router.post("/message", messageController.create)
router.get("/message/:conversationId", messageController.getMessage)



module.exports = router