import dotenv from "dotenv";
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdfParse = require('pdf-parse');
// import PDFParser from "pdf2json";
import fs from "fs";
import { GoogleGenAI } from "@google/genai";
dotenv.config();
const geminiKey = process.env.GOOGLE_GEMINI_API_KEY;

import User from "../models/UserModel.js";

function geminiPrompt(resumeText) {
    return ` this is a text parsed from a resume. return the title and it's values in a json format. Below is the resume content 
    
    ` + resumeText;
}


const ai = new GoogleGenAI({
    apiKey: geminiKey,
})


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
        request.body = parsedResult;
        next();
    } catch (error) {
        console.log(`Error occured: ${error}`);
        return response.status(500).send("Internal Server Error");
    }

}

export const parsePDF = async (request, response, next) => {
    try {
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
            -Suggest/Recommend Career paths to according to the skillset listed 
                
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
                
            ],
            "careerRecommendations":[{
            "title":,
            "description":,
            "avgSalary":
            },
            ]
            }  
            Here is the parsed resume json:`+ request.body;
        // console.log(pdfImprovementPrompt);
        const aiPDFStats = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: pdfImprovementPrompt,
        })

        fs.writeFile("./pdf/ResumeStats.txt", aiPDFStats.text, () => {
            console.log("sucessfull Analysis");
        });
        return response.status(200).json({
            stats: aiPDFStats.text
        });
    }
    catch (error) {
        console.log("Error occured in parsePDF:" + error);
        response.status(500).send("Internal Server Error!");
    }
}

export const generateRoadmap = async (request, response, next) => {
    try {

        const { title } = request.body;
        const roadmapPrompt = `
    Act as a Career Path Advisor and create a personalized 6-month learning roadmap for the given job title. Focus on technical skills, projects, and certifications needed to become job-ready.

    ### Output Rules:
    - Format as strict JSON.
    - Divide into monthly phases with:
    - skills_to_learn
    - projects_to_build
    - certifications
    - time_commitment (hours/week)
    - Prioritize skills by industry demand (e.g., Docker before Kubernetes for DevOps).
    - Include free/low-cost resources (e.g., "AWS Free Tier", "FreeCodeCamp").

    ### Example Output:
    json:
    {
    "job_title":,
    "roadmap": {
        "Month 1": {
        "focus": ,
        "skills_to_learn": [],
        "projects": [],
        "certifications": [],
        "time_commitment":"",
        "resources": []
        },
        "Month 2": {
        "focus": "",
        "skills_to_learn": [],
        "projects": [],
        "time_commitment": ""
        }
    },
    "estimated_hiring_timeline": ""
    }
        The job is for ${title}`

        const generatedRoadmap = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: roadmapPrompt
        }
        )
        fs.writeFile("./pdf/generatedRoadmap.txt", generatedRoadmap.text, () => {
            console.log("Generated and written roadmap");
        })
        response.status(200).send({ roadmap: generatedRoadmap.text });

    }
    catch (error) {
        console.log("Error in roadmap generation", error);
        return response.status(500).send({message: "Internal Server Error!"});
    }
}
