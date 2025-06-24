import { Router } from "express";
import { addResume, login, logout, parsePDF, signup } from "../controllers/authController.js";
import multer from "multer";
import { verifyToken } from "../middlewares/authMiddleware.js";

const authRoutes = Router();
const upload = multer({ dest: "uploads/resume/" });

// * routes
authRoutes.post("/signup", signup);
authRoutes.post("/login", login);
authRoutes.post("/logout", logout);
authRoutes.post("/add-resume", verifyToken, upload.single("resume"), addResume);
authRoutes.post("/parsepdf", parsePDF);

export default authRoutes;
