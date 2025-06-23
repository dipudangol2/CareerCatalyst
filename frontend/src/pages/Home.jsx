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

 {/* unlock your potential section  */}
      <section className="section-css">
        <h3 className="font-nav max-w-[500px] mx-auto font-semibold">
          Unlock your potential with Career Counselling
        </h3>
        <p className="font-body lg:max-w-[75%] mx-auto">
          Unlock your potential with our career counselling services. Our expert
          counsellors will help you unlock your full potential and find the job
          role that best suits your skills and interests.
        </p>

        <div className="flex flex-wrap justify-between mt-2">
          {/* services cards  */}
          <div className="service-cards">
            <img
              src={brain}
              alt="title-icon"
              className="w-[50px] h-[50px] object-cover"
            />
            <h5 className="font-heading font-semibold">
              {" "}
              Smart Resume Insights
            </h5>
            <p className="font-body text-textColor-secondary">
              Get actionable feedback on your resume using AI — no more
              guesswork.
            </p>
          </div>
          <div className="service-cards">
            <img
              src={job}
              alt="title-icon"
              className="w-[50px] h-[50px] object-cover"
            />
            <h5 className="font-heading font-semibold">
              {" "}
              Instant Job Role Suggestionss
            </h5>
            <p className="font-body text-textColor-secondary">
              Discover jobs you may not even know you’re qualified for.
            </p>
          </div>
          <div className="service-cards">
            <img
              src={time}
              alt="title-icon"
              className="w-[50px] h-[50px] object-cover"
            />
            <h5 className="font-heading font-semibold">
              {" "}
              Save Hours of Research
            </h5>
            <p className="font-body text-textColor-secondary">
              No need to Google endlessly — we simplify it into one dashboard.
            </p>
          </div>
          <div className="service-cards">
            <img
              src={mentor}
              alt="title-icon"
              className="w-[50px] h-[50px] object-cover"
            />
            <h5 className="font-heading font-semibold">
              {" "}
              Simulated Career Mentorship
            </h5>
            <p className="font-body text-textColor-secondary">
              Get expert-style guidance and encouragement tailored to your goals
              — just like having a mentor in your pocket.
            </p>
          </div>
          <div className="service-cards">
            <img
              src={brain}
              alt="title-icon"
              className="w-[50px] h-[50px] object-cover"
            />
            <h5 className="font-heading font-semibold">
              {" "}
              Personalized Career Paths
            </h5>
            <p className="font-body text-textColor-secondary">
              We match your profile with roles and learning paths that fit your
              goals..
            </p>
          </div>
          <div className="service-cards">
            <img
              src={roadmap}
              alt="title-icon"
              className="w-[50px] h-[50px] object-cover"
            />
            <h5 className="font-heading font-semibold">
              Career Roadmap Generator
            </h5>
            <p className="font-body text-textColor-secondary">
              Know what to learn next with clear, AI-generated learning paths..
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
