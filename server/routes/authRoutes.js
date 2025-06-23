import { Router } from "express";
import { login, logout, signup } from "../controllers/authController.js";

const authRoutes = Router();

// * routes
authRoutes.post("/signup", signup);
authRoutes.post("/login", login);
authRoutes.post("/logout", logout);

export default authRoutes;
