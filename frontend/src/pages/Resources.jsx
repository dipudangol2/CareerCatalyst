import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BlogPostCardItem from "../components/BlogPostCardItem";

export default function Resources() {
  const dummyFeaturedPosts = [
    {
      title: "5 Resume Mistakes That Are Costing You Interviews",
      description:
        "A quick guide to the most common resume errors and how to fix them to increase your chances of landing that dream job.",
      image:
        "https://images.unsplash.com/photo-1749741355867-8d40976f2bfb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
    },
    {
      title: "Top 7 In-Demand Tech Roles in 2025 (and How to Get Them)",
      description:
        "From AI Engineers to DevOps Specialists, discover the hottest roles in tech and the skills you need to break in.",
      image:
        "https://plus.unsplash.com/premium_photo-1750063400799-d3d386a86c36?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8",
    },
    {
      title: "How to Build a Career Roadmap That Actually Works",
      description:
        "Feeling stuck? Learn how to create a clear, step-by-step plan toward your desired career, whether you're a student or a switcher.",
      image:
        "https://plus.unsplash.com/premium_photo-1747852228953-48b53593fa80?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2fHx8ZW58MHx8fHx8",
    },
    {
      title: "AI in Hiring: What Recruiters Look for in Resumes Today",
      description:
        "Understand how AI screening tools analyze resumes and how to craft yours to pass both bots and humans.",
      image:
        "https://images.unsplash.com/photo-1749741322727-3c51c6b41903?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMXx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Career Switch? Here's How to Rewrite Your Resume with Confidence",
      description:
        "Thinking of changing industries? Here's how to highlight transferable skills and position yourself for new roles.",
      image:
        "https://images.unsplash.com/photo-1748367959778-12d026a20a99?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMnx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "How to Use CareerCatalyst to Land Your First Job",
      description:
        "A step-by-step walkthrough of how to use the CareerCatalyst platform to improve your resume, discover career paths, and take action.",
      image:
        "https://plus.unsplash.com/premium_photo-1679492943185-546bc0e6c02e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0N3x8fGVufDB8fHx8fA%3D%3D",
    },
  ];
  return (
    <>
      <section className="section-css gap-2">
        <p className="font-nav text-body max-w-[500px] text-start font-medium text-textColor-secondary">
          Browse featured Blog posts
        </p>

        <div className="relative w-full flex flex-col gap-12 lg:gap-0 lg:flex-row">
          {/* main post  */}
          <div className="relative flex lg:flex-1/2 flex-col gap-4 lg:pr-6">
            <div className="relative p-1 shadow-xl w-full">
              <img
                src="https://images.unsplash.com/photo-1749741355867-8d40976f2bfb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8"
                alt="blog-image"
                className="w-full h-auto object-cover"
              />
            </div>

            <h6 className="font-body font-medium text-start">
              5 Resume Mistakes That Are Costing You Interviews
            </h6>
            <p className="text-start text-textColor-secondary">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
              quae.
            </p>

            <Link className="text-start flex justify-between items-center text font-medium text-textColor-secondary transition-default hover:text-textColor-primary">
              <span>Read more &gt;</span>
              <span>5 min read</span>
            </Link>
          </div>

          {/* related posts  */}
          <div className="relative flex lg:flex-1/2 flex-col justify-start gap-3">
            {/* related posts  */}
            <div className="flex gap-3">
              <div className="flex-center p-1 shadow-xl">
                <img
                  src="https://plus.unsplash.com/premium_photo-1750063400799-d3d386a86c36?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8"
                  alt="blog-image"
                  className="lg:max-w-[150px] h-[160px] object-cover"
                />
              </div>

              {/* content part */}
              <div className="flex text-start flex-col gap-3">
                <p className="text-sm text-textColor-secondary">2 min read</p>
                <p className="font-body font-medium">
                  Top 7 In-Demand Tech Roles in 2025 (and How to Get Them)
                </p>
                <p className="font-body text-body-sm text-textColor-secondary">
                  From AI Engineers to DevOps Specialists, discover the hottest
                  roles in tech
                </p>
                <Link className="text-textColor-secondary hover:text-textColor-primary">
                  Read more &gt;
                </Link>
              </div>
            </div>
            {/* related posts  */}
            <div className="flex gap-3">
              <div className="flex-center p-1 shadow-xl">
                <img
                  src="https://plus.unsplash.com/premium_photo-1679492943185-546bc0e6c02e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0N3x8fGVufDB8fHx8fA%3D%3D"
                  alt="blog-image"
                  className="lg:max-w-[150px] h-[160px] object-cover"
                />
              </div>

              {/* content part */}
              <div className="flex text-start flex-col gap-3">
                <p className="text-sm text-textColor-secondary">2 min read</p>
                <p className="font-body font-medium">
                  How to Use CareerCatalyst to Land Your First Job
                </p>
                <p className="font-body text-body-sm text-textColor-secondary">
                  A step-by-step walkthrough of how to use the CareerCatalyst
                  platform
                </p>
                <Link className="text-textColor-secondary hover:text-textColor-primary">
                  Read more &gt;
                </Link>
              </div>
            </div>
            {/* related posts  */}
            <div className="flex gap-3">
              <div className="flex-center p-1 shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1748367959778-12d026a20a99?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMnx8fGVufDB8fHx8fA%3D%3D"
                  alt="blog-image"
                  className="lg:max-w-[150px] h-[160px] object-cover"
                />
              </div>

              {/* content part */}
              <div className="flex text-start flex-col gap-3">
                <p className="text-sm text-textColor-secondary">2 min read</p>
                <p className="font-body font-medium">
                  Career Switch? Here's How to Rewrite Your Resume with
                  Confidence
                </p>
                <p className="font-body text-body-sm text-textColor-secondary">
                  Thinking of changing industries? Here's how to highlight
                  transferable
                </p>
                <Link className="text-textColor-secondary hover:text-textColor-primary">
                  Read more &gt;
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* browse posts section  */}
        <section className="mt-[100px]">
          <p className="font-nav text-body max-w-[500px] text-start font-medium text-textColor-secondary">
            Browse latest Blog posts
          </p>

          {/* posts card wrapper  */}
          <div className="flex flex-wrap">
            {
              dummyFeaturedPosts.map((item, index)=>{
                return <BlogPostCardItem key={index} title={item.title} description={item.description} imgSrc={item.image}/>
              })
            }
          </div>

          <button className="btn-secondary mt-9">
              Load more
          </button>
        </section>
      </section>
    </>
  );
}
