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
  const dummyFaq = [
    {
      title: "What is CareerCatalyst?",
      description:
        "CareerCatalyst is an AI-powered career assistant that analyzes your resume, suggests personalized improvements, recommends relevant job roles, and even provides a roadmap to help you grow into your dream job.",
    },
    {
      title: "Is CareerCatalyst free to use?",
      description:
        "Yes — the MVP version of CareerCatalyst is completely free and doesn’t require sign-up. Just upload your resume and start exploring your results.",
    },
    {
      title: "What types of files can I upload?",
      description:
        "Currently, we support PDF and DOCX resumes. Make sure your file is readable (not scanned images) for best results.",
    },
    {
      title: "How does the AI provide resume feedback?",
      description:
        "We use OpenAI’s GPT models to analyze your resume and offer suggestions based on hiring best practices, keyword relevance, and clarity of presentation.",
    },
    {
      title: "How are job roles matched to my resume?",
      description:
        "Your skills, experience, and projects are extracted from your resume and matched against a predefined role database. We use keyword similarity and AI logic to recommend suitable roles.",
    },
    {
      title: "What’s in the roadmap?",
      description:
        "The roadmap includes recommended tools, skills, and mini-projects aligned with your chosen job role — from beginner to job-ready.",
    },
    {
      title: "Is my resume stored or shared?",
      description:
        "Nope. Your resume is processed temporarily and never saved. We prioritize your privacy.",
    },
    {
      title: "Can I simulate mentorship?",
      description:
        "Yes! We offer simulated mentorship using AI prompts tailored to your background and career goals — just like a real mentor would.",
    },
    {
      title: "Do I need to create an account?",
      description:
        "No account is required to use the core features. You can optionally save your data in the future versions we plan to build.",
    },
    {
      title: "Can I trust the advice?",
      description:
        "While we aim to provide helpful, personalized guidance, CareerCatalyst should supplement — not replace — real-world mentorship and professional reviews.",
    },
  ];
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

         {/* join today section  */}
      <section className="hidden lg:block py-yAxis-sm section-css">
        <div className="flex-center">
          <img
            src={joinUs}
            alt="join-todaysvg"
            className="w-full h-auto rounded-2xl"
            loading="lazy"
          />
        </div>
        <button className="absolute top-[55%] right-[20%] -translate-x-1/2 -translate-y-1/2 rounded-xl btn-secondary">
          <Link className="text-2xl">Sign up</Link>
        </button>
      </section>

      {/* your career companion section  */}
      <section className="section-css">
        <h3 className="font-nav max-w-[500px] mx-auto font-semibold">
          Your Career Companion in 3 Steps
        </h3>
        <p className="font-body lg:max-w-[75%] mx-auto">
          CareerCatalyst makes career growth effortless. Upload your resume, get
          personalized feedback powered by AI, explore job roles that fit your
          strengths, and follow a clear roadmap to reach your goals — all in
          just a few clicks.
        </p>

        <div className="flex flex-col md:flex-row items-center md:justify-between mt-5">
          {/* career step cards  */}
          <div className="careerStep-cards">
            <h5 className="font-heading font-semibold"> 🧑‍💻 Upload & Analyze</h5>
            <p className="font-body text-textColor-secondary">
              Upload your resume (PDF or DOCX) and let our AI extract key
              information about your skills, experience, and strengths.
            </p>
          </div>
          <div className="careerStep-cards">
            <h5 className="font-heading font-semibold">
              {" "}
              🧠 Get Smart Suggestions
            </h5>
            <p className="font-body text-textColor-secondary">
              Receive personalized improvement tips and role recommendations
              based on your unique profile — just like having a career coach by
              your side.
            </p>
          </div>
          <div className="careerStep-cards">
            <h5 className="font-heading font-semibold">
              {" "}
              🚀 Follow a Career Roadmap
            </h5>
            <p className="font-body text-textColor-secondary">
              Get a step-by-step learning path to reach your desired job role,
              with suggested tools, projects, and courses.
            </p>
          </div>
        </div>
        <button className="btn-secondary mx-auto w-fit">
          <Link to="/find-job" className="text-2xl">
            Find a Job
          </Link>
        </button>
      </section>

        {/* faqs section  */}
      <section className="section-css">
        <h3 className="font-nav max-w-[500px] mx-auto font-semibold">FAQs</h3>
        <p className="font-body lg:max-w-[75%] mx-auto">
          Still have questions? Here are some quick answers to help you get the
          most out of CareerCatalyst.
        </p>

        <div className="grid grid-cols-1 font-body md:grid-cols-2 gap-8 mt-5">
          {/* faq cards  */}
          {
            dummyFaq.map((item, index)=>{
              return <FaqItem title={item.title} description={item.description} key={index} />
            })
          }
        </div>
      </section>
    </>
  );
}
