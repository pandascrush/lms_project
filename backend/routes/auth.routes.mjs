// routes/authRoutes.js
import express from "express";
const router = express.Router();
import { login, registerUser } from "../controller/Auth.controller.mjs";

router.post("/register", registerUser);
router.post("/login", login);

export default router;
