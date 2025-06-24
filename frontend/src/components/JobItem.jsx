import React from "react";
import webDev from "../assets/webDev.svg";
import bookmark from "../assets/bookmark.svg";

export default function JobItem({job}) {
  return (
    <div className="flex gap-4 px-4 py-6 shadow-md">
      {/* image  */}
      <div className="flex-center p-2 h-fit border-[1px] border-gray-200">
        <img
          src={webDev}
          alt="job-icon"
          className="min-w-15 h-15 object-cover"
        />
      </div>
      {/* content  */}
      <div className="flex grow text-start flex-col gap-1">
        <h6 className="font-nav font-semibold">{job.title}</h6>
        <p className="font-body font-medium text-textColor-secondary max-w-[600px]">
          {job.description.length > 100
            ? `${job.description.slice(0, 100)}...`
            : job.description}
        </p>
        {/* roadmap  */}
        <div className="mt-3">
          <button className="btn-secondary">Roadmap</button>
        </div>

        <div className="flex justify-between items-center flex-wrap mt-5">
          {/* salary  */}
          <div className="flex flex-col gap-1 font-medium">
            <p className="text-textColor-secondary">Avg. Salary</p>
            <p className="text-shadow-textColor-primary">{job.avgSalary}</p>
          </div>

          {/* save job  */}
          <div className="inline">
            <button className="flex">
              <img
                src={bookmark}
                alt="bookmarkIcon"
                className="w-6 h-6 opacity-35"
              />
              <span className="ml-2">Save job</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
