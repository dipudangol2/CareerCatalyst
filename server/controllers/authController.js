import dotenv from "dotenv";
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const ResumeParser = require("resume-parser");
const pdfParse = require('pdf-parse');
import jwt from "jsonwebtoken";
import { compare } from "bcrypt";
import PDFParser from "pdf2json";
import fs from "fs";
import { GoogleGenAI } from "@google/genai";
dotenv.config();
const geminiKey = process.env.GOOGLE_GEMINI_API_KEY;
console.log(geminiKey);
// * cjs to mjs



import User from "../models/UserModel.js";



// * Variables
const maxAge = 3 * 24 * 60 * 60 * 1000;
function geminiPrompt(resumeText) {
    return ` this is a text parsed from a resume. return the title and it's values in a json format. Below is the resume content 
    
    ` + resumeText;
}

// * Functions
const createToken = (email, userId) => {
    return jwt.sign({ email, userId }, process.env.JWT_KEY, {
        expiresIn: maxAge,
    });
};
const pdfParser = new PDFParser();

const ai = new GoogleGenAI({
    apiKey: geminiKey,
})

export const signup = async (request, response, next) => {
    try {
        const { fullName, email, password } = request.body;
        if (!email && !password && !!fullName) {
            return response.status(400).send({ message: "Credentials not passed!" });
        }

        const existingUser = await User.findOne({ email, fullName });
        if (existingUser) {
            return response.status(400).send({ message: "User already exists!" });
        }

        const user = await User.create({ fullName, email, password });
        response.cookie("jwt", createToken(email, user.id), {
            maxAge: maxAge,
            secure: true,
            sameSite: "None",
        });
        return response.status(201).json({
            user: {
                id: user.id,
                fullName: user.fullName,
                email: user.email,
            },
        });
    } catch (error) {
        console.log(`Error occured in signup: ${error}`);
        return response.status(500).send({ message: "Internal Server Error" });
    }
};

export const login = async (request, response, next) => {
    try {
        const { email, password } = request.body;
        if (!email && !password) {
            return response.send.status(400).send({ message: "Email and Password is required." });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return response.status(404).send({ message: "User with the credentials not found!" });
        }
        const auth = await compare(password, user.password);
        if (!auth) {
            return response.status(400).send({ message: "Password is incorrect!!" });
        }
        response.cookie("jwt", createToken(email, user.id), {
            maxAge,
            secure: true,
            sameSite: "None",
        });
        return response.status(201).json({
            user: {
                id: user.id,
                email: user.email,
                fullName: user.fullName,
            },
        });
    } catch (error) {
        console.log(`Error occured: ${error}`);
        return response.status(500).send({ message: "Internal Server Error" });
    }
};

export const logout = (request, response, next) => {
    try {
        response.clearCookie("jwt").status(200).send({
            message: "Logged out successfully",
        });
    } catch (error) {
        console.log("Error occured in logout: " + error);
    }
}



export const addResume = async (request, response, next) => {
    try {
        if (!request.file) {
            return response.status(400).send("File is required!");
        }
        const date = Date.now();
        let fileName = "uploads/resume/" + date + request.file.originalname;
        fs.renameSync(request.file.path, fileName);
        const updatedUser = await User.findByIdAndUpdate(
            request.userId,
            {
                resume: fileName,
            }, {
            new: true,
            runValidators: true,
        }
        );

        return response.status(200).json({
            resume: updatedUser.resume,
        });

    } catch (error) {
        console.log(`Error occured: ${error}`);
        return response.status(500).send("Internal Server Error");
    }

}

export const parsePDF = async (request, response, next) => {
    try {
        let pdfData = "";
        let dataBuffer = fs.readFileSync("./pdf/Dipu-Dangol-Resume.pdf");
        const data = await pdfParse(dataBuffer)

        pdfData += data.text
        console.log(pdfData);
        let aiPrompt = geminiPrompt(pdfData);
        console.log(aiPrompt);
        const pdfParseResponse = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: aiPrompt,
        })
        fs.writeFile("./pdf/geminiOutput.txt", pdfParseResponse.text, () => {
            console.log("Completed generation!");
        })
        const aiOutput = pdfParseResponse.text;
        let result = aiOutput.replace(/^\`\`\`json\s*/, '');
        result = result.replace(/\`\`\`$/, '');
        fs.writeFile("./pdf/geminiOutput2.txt", result, () => {
            console.log("written file!");
        })
        const res = JSON.parse(result);
        console.log(res);

        response.send(200);
    }
    catch (error) {
        console.log("Error occured in parsePDF:" + error);
        response.status(500).send("Internal Server Error!");
    }
}