const express = require("express");
const { getContactsHistory, getChat } = require("../controllers/chatcontroller");
const chatRouter = express.Router(); 

chatRouter.get("/", getContactsHistory);
chatRouter.get("/:userId", getChat);

module.exports = chatRouter;