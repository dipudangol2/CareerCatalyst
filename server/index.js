import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const databaseURL = process.env.DATABASE_URL;

app.use(
  cors({
    origin: [process.env.ORIGIN],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/uploads/resume", express.static("uploads/resume"));
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);

// const data = {
//   "personal_details": {
//     "name": "Prashant Bartaula",
//     "address": "Kalanki-13, Kathmandu",
//     "phone": "9849713189",
//     "linkedin": "LinkedIn",
//     "github": "Github"
//   },
//   "education": [
//     {
//       "institution": "Daisy English Boarding School",
//       "degree": "SLC",
//       "location": "Parsa, Chitwan",
//       "duration": "2076-2078",
//       "gpa": "3.70"
//     },
//     {
//       "institution": "Skyrider College",
//       "degree": "+2 Computer Science",
//       "location": "Tandi, Chitwan",
//       "duration": "2078-2079",
//       "gpa": "3.36"
//     },
//     {
//       "institution": "Kathmandu Bernhardt College",
//       "degree": "Bsc. CSIT",
//       "location": "Bafal, Kathmandu",
//       "duration": "2080 - present"
//     }
//   ],
//   "skills": {
//     "Frontend": {
//       "items": [
//         "Html",
//         "Css",
//         "Javascript",
//         "React",
//         "TailwindCss",
//         "Bootstrap",
//         "GSAP",
//         "Framer motion"
//       ],
//       "level": "Advanced"
//     },
//     "Backend": {
//       "items": [
//         "Php",
//         "NodeJs",
//         "ExpressJs"
//       ],
//       "level": "Intermediate"
//     },
//     "Databases": {
//       "items": [
//         "MongoDb",
//         "MySql"
//       ],
//       "level": "Intermediate"
//     },
//     "Communication": {
//       "items": [
//         "English",
//         "Nepali language"
//       ],
//       "type": "Written and Spoken",
//       "level": "Strong"
//     }
//   },
//   "projects": [
//     {
//       "title": "Service Marketplace",
//       "description": "Fullstack Mern application for service management"
//     },
//     {
//       "title": "Mern Blog",
//       "description": "Blog application built in react"
//     },
//     {
//       "title": "File Compressor",
//       "description": "Implementation of huffman coding algorithm"
//     }
//   ],
//   "interests": [
//     "Coding",
//     "Gaming",
//     "Music"
//   ]
// }

// const resumeText = `
// Dipu Dangol
// dipudangol2@gmail.com
 
// +977 9863339739
 
// Kathmandu, Nepal
 
// dipudangol2
 
// Profile
// Enthusiastic and detail-oriented B.Sc.CSIT student with a growing interest in system administration 
// and cloud technologies. Certified AWS Solutions Architect (SAA-C03) with a foundational 
// understanding of cloud networking, infrastructure, and security. Passionate about Linux systems 
// and eager to apply and expand technical skills in a hands-on learning environment.
// Professional Experience
// Cloud Apprentice
// Adex International
// Developed  a  strong  foundation  in  cloud  networking,  identity  and  access
// management  and  monitoring.  Gained  hands-on  experience  with  different
// AWS services.
// 11/2024 – 02/2025
// Kathmandu, Nepal
// Projects
// Web Scraper
// Webscraper to get job and weather data
// React-data-analytics
// Single page application using react
// ToDo app
// Todo list app made with react
// Education
// B.Sc.CSIT
// Kathmandu BernHardt College
// 04/2022 – present
// Kathmandu, Nepal
// +2, Science
// Viswa Niketan Secondary School
// 08/2018 – 05/2020
// Kathmandu, Nepal
// Secondary Level
// Gillette Int'l Boarding School
// 09/2004 – 07/2018
// Kathmandu, Nepal
// Skills
// ReactExpressHTML, CSS, JSPythonPostgreSQLLinuxBash ScriptingGit
// AWSNodeJSTailwindCSSNext.jsPHPSQLMongoDB
// Certificates
// AWS Certified Solutions Architect (SAA-C03)
// 08 February 2025
// Voluntary Experience
// Hackathon Participant
// KUSOM IS Hackathon
// 06/2024 – 06/2024
// Kathmandu, Nepal
// Workshop Facilitator
// Coding Olympics Nepal
// 05/2023 – 07/2023
// Kathmandu, Nepal
// Interests
// MusicTravellingReadingGaming
// ||
// ||
// |
// `;

// function analyzeResume(text) {
//   const result = {
//     contactInfo: 0,
//     sectionCompleteness: 0,
//     skillCoverage: 0,
//     formatting: 0,
//     actionVerbs: 0,
//     total: 0,
//   };

//   const emailFound = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/.test(text);
//   const phoneFound = /(?:\+?\d{1,3})?[ -]?\(?\d{3}\)?[ -]?\d{3}[ -]?\d{4}/.test(text);
//   const githubFound = /github\.com/i.test(text);
//   const linkedinFound = /linkedin\.com/i.test(text);

//   let contactPoints = 0;
//   if (emailFound) contactPoints += 5;
//   if (phoneFound) contactPoints += 5;
//   if (githubFound) contactPoints += 5;
//   if (linkedinFound) contactPoints += 5;
//   result.contactInfo = contactPoints;

//   const sections = [
//     "personal_details",
//     "education",
//     "experience",
//     "projects",
//     "skills",
//   ];
//   const sectionHits = sections.filter((s) => text.toLowerCase().includes(s));
//   result.sectionCompleteness = (sectionHits.length / sections.length) * 20;

//   const skillKeywords = [
//     "html",
//     "css",
//     "javascript",
//     "react",
//     "node",
//     "git",
//     "mongo",
//     "docker",
//   ];
//   const foundSkills = skillKeywords.filter((skill) =>
//     new RegExp(`\\b${skill}\\b`, "i").test(text)
//   );
//   result.skillCoverage = (foundSkills.length / skillKeywords.length) * 20;

//   const bulletPoints = (text.match(/[\n•\-–]\s+/g) || []).length;
//   const headers = (text.match(/\n[A-Z\s]{4,}\n/g) || []).length;
//   result.formatting = Math.min(20, bulletPoints + headers * 2);

//   const actionVerbs = [
//     "led",
//     "built",
//     "developed",
//     "created",
//     "designed",
//     "implemented",
//     "managed",
//   ];
//   const weakVerbs = ["worked", "helped", "responsible"];

//   const actionCount = actionVerbs.reduce(
//     (acc, word) =>
//       acc +
//       (text.toLowerCase().match(new RegExp(`\\b${word}\\b`, "g")) || []).length,
//     0
//   );
//   const weakCount = weakVerbs.reduce(
//     (acc, word) =>
//       acc +
//       (text.toLowerCase().match(new RegExp(`\\b${word}\\b`, "g")) || []).length,
//     0
//   );

//   result.actionVerbs = Math.max(
//     0,
//     Math.min(20, actionCount * 3 - weakCount * 2)
//   );

//   result.total =
//     result.contactInfo +
//     result.sectionCompleteness +
//     result.skillCoverage +
//     result.formatting +
//     result.actionVerbs;

//   return result;
// }

// function scoreFromParsedJSON(data) {
//   const breakdown = {
//     content_structure: 0,
//     technical_skills: 0,
//     experience_impact: 0,
//     ats_readability: 0,
//     red_flags: 0,
//   };

//   const requiredSections = [
//     "personal_details",
//     "education",
//     "skills",
//     "projects",
//     "interests",
//     "experience",
//   ];
//   const foundSections = requiredSections.filter((section) => data[section]);
//   const sectionCount = foundSections.length;
//   breakdown.content_structure = (sectionCount * 16.67).toFixed();

//   const skillsList = [
//     ...(data.skills?.Frontend?.items || []),
//     ...(data.skills?.Backend?.items || []),
//     ...(data.skills?.Databases?.items || []),
//   ];
//   const knownSkills = [
//     "html",
//     "css",
//     "javascript",
//     "react",
//     "tailwindcss",
//     "bootstrap",
//     "gsap",
//     "framer motion",
//     "php",
//     "nodejs",
//     "expressjs",
//     "mongodb",
//     "mysql",
//   ];
//   const matchedSkills = skillsList
//     .map((s) => s.toLowerCase())
//     .filter((skill) => knownSkills.includes(skill));
//   const matchedCount = matchedSkills.length;
//   breakdown.technical_skills = (matchedCount * 7.69).toFixed();

//   const impactKeywords = [
//     "algorithm",
//     "implementation",
//     "fullstack",
//     "mern",
//     "react",
//     "management",
//   ];
//   let impactScore = 0;
//   data.projects.forEach((project) => {
//     impactKeywords.forEach((keyword) => {
//       if (project.description.toLowerCase().includes(keyword)) impactScore++;
//     });
//   });
//   breakdown.experience_impact = (impactScore * 16.67).toFixed();

//   const readable =
//     data.skills?.Frontend?.level &&
//     data.skills?.Backend?.level &&
//     data.skills?.Databases?.level;
//   const structuredText =
//     data.education.length >= 2 && data.projects.length >= 2;
//   breakdown.ats_readability = readable && structuredText ? "50" : "25";

//   let redFlags = 0;
//   if (!data.personal_details.email && !data.personal_details.phone) redFlags++;
//   if (!data.education || data.education.length === 0) redFlags++;
//   if (!data.projects || data.projects.length === 0) redFlags++;
//   if (!data.interests || data.interests.length === 0) redFlags++;
//   if (!data.experience || data.experience.length === 0) redFlags++;
//   breakdown.red_flags = redFlags.toFixed();

//   return {
//     breakdown,
//   };
// }

// const result = scoreFromParsedJSON(data);
// const result2=analyzeResume(resumeText);
// console.log(result, result2);

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

mongoose
  .connect(databaseURL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });
