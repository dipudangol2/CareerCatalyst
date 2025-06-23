import { Router } from "express";
import { addResume, login, parsePDF, signup } from "../controllers/authController.js";
import multer from "multer";

const authRoutes = Router();
const upload = multer({ dest: "uploads/resume/" });

// * routes
authRoutes.post("/signup", signup);
authRoutes.post("/login", login);
authRoutes.post("/add-resume", upload.single("resume"), addResume);
authRoutes.post("/parsepdf", parsePDF);

export default authRoutes;
