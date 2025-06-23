import React, { useEffect } from "react";
import resume from "../assets/resume.svg";
import webDev from "../assets/webDev.svg";
import bookmark from "../assets/bookmark.svg";

export default function FIndjob() {
  return (
    <section className="section-css max-w-[1000px]">
      <h2 className="font-body text-start font-semibold">
        Find your ideal job
      </h2>

      <div className="relative px-4 py-5 flex items-center gap-5 border-2 bg-accent-secondary/5  border-accent-secondary hover:bg-accent-secondary/20 transition-default rounded-xl cursor-pointer">
        <div>
          <img src={resume} alt="resume-icon" className="w-8 h-8" />
        </div>

        <div className="flex flex-col gap-1 text-start">
          <p className="font-nav font-semibold text-xl">Upload your resume</p>
          <p className="font-body text-shadow-accent-secondary">
            We'll match you with your ideal career Right now, Right away!
          </p>
          <span className="absolute right-5 top-1/2 -translate-y-1/2 text-lg">
            +
          </span>
        </div>
      </div>

      {/* recommended job roles  */}
      <div className="flex flex-col gap-10 mt-5">
        <div className="flex justify-between">
          <p className="font-body text-textColor-secondary font-medium">
            284 results found
          </p>

          {/* filter feature */}
        </div>

        {/* job roles  */}
        <div className="flex flex-col gap-6 w-full relative">
          {/* job items  */}
          <div className="flex gap-4 px-4 py-6 shadow-md">
            {/* image  */}
            <div className="flex-center p-2 h-fit border-[1px] border-gray-200">
              <img
                src={webDev}
                alt="job-icon"
                className="w-15 h-15 object-cover"
              />
            </div>
            {/* content  */}
            <div className="flex grow text-start flex-col gap-1">
              <h6 className="font-nav font-semibold">Web Developer</h6>
              <p className="font-body font-medium text-textColor-secondary max-w-[600px]">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Consequatur odio in, veritatis maiores itaque harum incidunt
                esse ill.
              </p>
              {/* roadmap  */}
              <div className="mt-3">
                <button className="btn-secondary">Roadmap</button>
              </div>

              <div className="flex justify-between items-center flex-wrap mt-5">
                {/* salary  */}
                <div className="flex flex-col gap-1 font-medium">
                  <p className="text-textColor-secondary">Avg. Salary</p>
                  <p className="text-shadow-textColor-primary">
                    $30,000 - $50,000
                  </p>
                </div>

                {/* save job  */}
                <div className="inline">
                  <button className="flex">
                      <img src={bookmark} alt="bookmarkIcon" className="w-6 h-6 opacity-35"/>
                      <span className="ml-2">Save job</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* job items  */}
          <div className="flex gap-4 px-4 py-6 shadow-md">
            {/* image  */}
            <div className="flex-center p-2 h-fit border-[1px] border-gray-200">
              <img
                src={webDev}
                alt="job-icon"
                className="w-15 h-15 object-cover"
              />
            </div>
            {/* content  */}
            <div className="flex grow text-start flex-col gap-1">
              <h6 className="font-nav font-semibold">Web Developer</h6>
              <p className="font-body font-medium text-textColor-secondary max-w-[600px]">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Consequatur odio in, veritatis maiores itaque harum incidunt
                esse ill.
              </p>
              {/* roadmap  */}
              <div className="mt-3">
                <button className="btn-secondary">Roadmap</button>
              </div>

              <div className="flex justify-between items-center flex-wrap mt-5">
                {/* salary  */}
                <div className="flex flex-col gap-1 font-medium">
                  <p className="text-textColor-secondary">Avg. Salary</p>
                  <p className="text-shadow-textColor-primary">
                    $30,000 - $50,000
                  </p>
                </div>

                {/* save job  */}
                <div className="inline">
                  <button className="flex">
                      <img src={bookmark} alt="bookmarkIcon" className="w-6 h-6 opacity-35"/>
                      <span className="ml-2">Save job</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
