import { Router } from "express";
import multer from "multer";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { addResume, generateRoadmap, parsePDF } from "../controllers/resumeController.js";


const resumeRoutes = Router();
const upload = multer({ dest: "uploads/resume/" });


resumeRoutes.post("/add-resume", verifyToken, upload.single("resume"), addResume, parsePDF);
resumeRoutes.post("/generate-roadmap", generateRoadmap);

export default resumeRoutes;