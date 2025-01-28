import express from "express";
import { userAuthenticator } from "../middleware/userAuthMiddleware.js";
import { getMessages, getSidebarContacts, sendMessage } from "../controllers/messageController.js";

const router = express.Router();

router.get("/users", userAuthenticator, getSidebarContacts);
router.get("/:id", userAuthenticator, getMessages);
router.post("/send/:id", userAuthenticator, sendMessage);

export default router;