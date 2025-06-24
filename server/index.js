import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const databaseURL = process.env.DATABASE_URL;


app.use(cors({
    origin: ["*"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use("/uploads/resume", express.static("uploads/resume"))
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);





const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

mongoose
    .connect(databaseURL)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("Error connecting to the database:", err);
    });
