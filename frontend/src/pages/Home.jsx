import React from "react";
import { Link } from "react-router-dom";
import heroBg from "../assets/careers.svg";
import brain from "../assets/brainsvg.svg";
import job from "../assets/jobsvg.svg";
import time from "../assets/time.svg";
import roadmap from "../assets/roadmap.svg";
import mentor from "../assets/mentor.svg";
import joinUs from "../assets/joinToday.svg";
import FaqItem from "../components/FaqItem";

export default function Home() {
  return (
    <>
      {/* hero section  */}
      <section className="relative px-xAxis-sm sm:px-xAxis-md md:px-xAxis-lg py-[50px] min-h-[500px] max-w-[1600px] mx-auto flex  items-center">
        {/* content side */}
        <div className="relative z-100 flex flex-col gap-6 text-center lg:text-start lg:max-w-[700px] ">
          <h1 className=" font-body">
            Accelerate Your Journey From{" "}
            <span className="text-accent-secondary">Resume</span> to Dream Role
          </h1>
          <p className="font-heading text-textColor-secondary font-normal break-words">
            Upload your resume and let AI do the rest — get personalized
            feedback, job role recommendations, and a step-by-step learning
            roadmap to land your ideal job.
          </p>
          <button className="btn-secondary w-fit text-lg mx-auto lg:mx-0">
            Explore
          </button>
        </div>

        {/* image side */}
        <div className="absolute inset-0 z-10 opacity-20 lg:opacity-100 lg:relative grow flex-center order-1">
          <img
            src={heroBg}
            alt="hero"
            className="w-full min-w-[500px] max-w-[500px] lg:max-w-[800px] object-cover"
          />
        </div>
      </section>

    </>
  );
}
