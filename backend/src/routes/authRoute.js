import express from "express";
import { checkAuth, login, logout, signup, updateProfile } from "../controllers/authController.js";
import { userAuthenticator } from "../middleware/userAuthMiddleware.js";

const router = express.Router();

router.post("/signup",signup);

router.post("/login",login);

router.get("/logout",logout);

router.put("/profile-update", userAuthenticator, updateProfile);

router.get("/check", userAuthenticator, checkAuth);

export default router;