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
        // * take resume from the frontend and store the file
        if (!request.file) {
            return response.status(400).send({ message: "File is required!" });
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
        // * pdf parsing and json creation
        let pdfData = "";
        let dataBuffer = fs.readFileSync(`./${fileName}`);
        const data = await pdfParse(dataBuffer);
        pdfData += data.text
        let aiPrompt = geminiPrompt(pdfData);
        const pdfParseResponse = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: aiPrompt,
        })
        fs.writeFile("./uploads/geminiOutput.txt", pdfParseResponse.text, () => {
            console.log("Completed generation!");
        })
        const aiOutput = pdfParseResponse.text;
        let parsedResult = aiOutput.replace(/^\`\`\`json\s*/, '');
        parsedResult = parsedResult.replace(/\`\`\`$/, '');
        fs.writeFile("./pdf/geminiOutput2.txt", parsedResult, () => {
            console.log("written file!");
        });
        const pdfImprovementPrompt = `
            Act as a Senior Resume Analyst and ATS Optimization Expert. Analyze the following resume JSON using weighted metrics and provide structured feedback. Focus on technical roles (e.g.Frontend development, Backend Development, Cloud, DevOps, Software Engineering).  
        
            ### Evaluation Criteria & Weights  
            1. Content & Structure (20%)  
               - Clarity (0-5)  
               - Conciseness (0-5)  
               - Grammar/Spelling (0-5)  
               - Reverse Chronology (0-5)  

            2. Technical Skills (30%)  
               - Keyword Density (% match to target job description)  
               - Skill Stacking (Grouping foundational + advanced skills)  
               - Certifications (AWS, Kubernetes, etc.)  
               - Tool Diversity (Breadth of technologies)  

            3. Experience & Impact (30%)  
               - Quantifiable Results (0-10)  
               - Role Relevance (0-10)  
            - Project Depth (0-10)  
            - Career Progression (0-10)  
                
            4. ATS & Readability (20%)  
            - Header Formatting (✅/❌)  
            - Machine Readability (✅/❌)  
            - Keyword Placement (First 1/3 of resume)  
            - Action Verbs (e.g., "Optimized," "Architected")  
                
            5. Red Flags (Penalties)  
            - Employment Gaps (>6 months): -5 pts  
            - Overused Buzzwords: -3 pts  
            - Generic Objectives: -2 pts  
                
            ### Instructions  
            1. Calculate Scores for each category (0-100).  
            2. Highlight Top 5 Skills prioritized by industry demand but relevant to the resume.  
            3. Identify Gaps according to the skillset(e.g., missing Docker/Kubernetes for DevOps).  
            4. Suggest Improvements with examples:  
            - Rewrite weak bullet points (e.g., "Reduced AWS costs by 30% via Lambda optimization").  
            - ATS fixes (e.g., replace "Managed servers" with "Deployed scalable EC2 instances").  
                
            ### Output Format  
            json
            {
            "overall_score": ,
            "score_breakdown": {
                "content_structure": ,
                "technical_skills": ,
                "experience_impact": ,
                "ats_readability": ,
                "red_flags": 
            },
            "priority_skills": [],
            "missing_skills": [],
            "improvements": [
                
            ],
            "strengths": [
               
            ],
            "weaknesses": [
                
            ]
            }  
            Here is the parsed resume json:`+ parsedResult
        // console.log(pdfImprovementPrompt);
        const aiPDFStats = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: pdfImprovementPrompt,
        })

        fs.writeFile("./pdf/ResumeStats.txt", aiPDFStats.text, () => {
            console.log("sucessfully analysis");
        });
        
        return response.status(200).json({
            resume: updatedUser.resume,
            stats: aiPDFStats.text
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