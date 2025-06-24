import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import resume from "../assets/resume.svg";
import JobItem from "../components/JobItem";
import webDev from "../assets/webDev.svg";
import bookmark from "../assets/bookmark.svg";
import loadingIcon from "../assets/loading.gif";
import star from "../assets/star.svg";

export default function Findjob() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [parsedResume, setParsedResume] = useState({});
  const [roadmap, setRoadmap] = useState({});
  const fileRef = useRef(null);

  useEffect(() => {
    setParsedResume(JSON.parse(localStorage.getItem("resumeData")));
  }, []);

  const handleFileSelect = async () => {
    fileRef.current.click();
  };

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };
  const handleUpload = async () => {
    if (!file) {
      return toast.error("Please select a file");
    }

    const formData = new FormData();
    formData.append("resume", file);
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/resume/add-resume", {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        const parsedData = data.stats.replace("```json", "");
        const finalParsed = parsedData.replace("```", "");
        setParsedResume(JSON.parse(finalParsed));
        localStorage.setItem("resumeData", finalParsed);
        toast.success("Resume uploaded successfully");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };


  const handleRoadmapGeneration=async (title)=>{

    try {
      const res=await fetch('http://localhost:5000/api/resume/generate-roadmap',{
        method:"POST",
        credentials:"include",
        body:{
          title:title.toString()
        }
      })
      const data=await res.json();
      if(res.ok){
        setRoadmap(data);
        console.log(data)
        localStorage.setItem("roadmap",JSON.stringify(data));
      }
    } catch (error) {
      console.log(error.message)
      toast.error(error.message);
    }
  }
  return (
    <section className="section-css max-w-[1500px]">
      <h2 className="font-body text-start font-semibold">
        Find your ideal job
      </h2>

      <div className="grid grid-cols-1 gap-y-[100px] lg:gap-y-0 lg:grid-cols-3 gap-14">
        <div className="lg:col-span-2">
          <div
            className="relative px-4 py-5 flex items-center gap-5 border-2 bg-accent-secondary/5  border-accent-secondary hover:bg-accent-secondary/20 transition-default rounded-xl cursor-pointer"
            onClick={handleFileSelect}
          >
            {loading ? (
              <div className="flex-center w-full">
                <img
                  src={loadingIcon}
                  alt="loading-icon"
                  className="w-12 h-12"
                />
              </div>
            ) : (
              <>
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => handleFileChange(e)}
                  ref={fileRef}
                  accept="application/pdf"
                />
                <div>
                  <img src={resume} alt="resume-icon" className="w-8 h-8" />
                </div>

                <div className="flex flex-col gap-1 text-start">
                  <p className="font-nav font-semibold text-xl">
                    Upload your resume
                  </p>
                  <p className="font-body text-shadow-accent-secondary">
                    We'll match you with your ideal career Right now, Right
                    away!
                  </p>
                  <span className="absolute right-5 top-1/2 -translate-y-1/2 text-lg">
                    {file?.name ? "✔" : "+"}
                  </span>
                </div>
              </>
            )}
          </div>

          <button
            className="btn-secondary mx-auto mt-5 "
            onClick={handleUpload}
          >
            Upload
          </button>

          {/* resume analysis part */}
          {Object.keys(parsedResume).length !== 0 && (
            <div className="flex justify-between mt-8">
              <p className="relative text-textColor-secondary font-body font-medium">
                Your resume score:
                <span className="ml-3">
                  {parsedResume["overall_score"]}/100
                </span>
              </p>

              <Link
                to="/resume-analysis"
                className="text-textColor-secondary font-body hover:text-accent-secondary transition-default underline "
              >
                Click here: overview of your resume
              </Link>
            </div>
          )}

          {/* recommended job roles  */}
          <div className="flex flex-col gap-10 mt-5">
            <div className="flex justify-between">
              <p className="font-body text-textColor-secondary font-medium">
                {Object.keys(parsedResume).includes("careerRecommendations")
                  ? `${
                      Object.keys(parsedResume["careerRecommendations"]).length
                    } results found`
                  : "0 results found"}
              </p>

              {/* filter feature */}
            </div>

            {/* job roles  */}
            <div className="flex flex-col gap-6 w-full relative">
              {Object.keys(parsedResume).includes("careerRecommendations") &&
                parsedResume["careerRecommendations"].map((job, index) => (
                  <JobItem job={job} key={index} handleRoadmapGeneration={handleRoadmapGeneration}/>
                ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:col-span-1 gap-5">
          <h6 className="font-nav font-semibold text-start">
            Recommended for you
          </h6>
          <div className="flex flex-col gap-5">
            {/* recommended job UI  */}
            <div className="flex gap-3 items-center">
              <img
                src="https://plus.unsplash.com/premium_photo-1750063400799-d3d386a86c36?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8"
                alt=""
                className="w-16 h-16 object-cover"
              />

              <div className="flex text-start flex-col gap-1">
                <p className="font-nav font-medium">Web Developer</p>
                <p className="font-body text-textColor-secondary">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
            </div>
            {/* recommended job UI  */}
            <div className="flex gap-3 items-center">
              <img
                src="https://images.unsplash.com/photo-1750008267598-7f68e1a25ab8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw4fHx8ZW58MHx8fHx8"
                alt=""
                className="w-16 h-16 object-cover"
              />

              <div className="flex text-start flex-col gap-1">
                <p className="font-nav font-medium">Web Designer</p>
                <p className="font-body text-textColor-secondary">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
            </div>
            {/* recommended job UI  */}
            <div className="flex gap-3 items-center">
              <img
                src="https://images.unsplash.com/photo-1750101272034-7becde7454dd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw5fHx8ZW58MHx8fHx8"
                alt=""
                className="w-16 h-16 object-cover"
              />

              <div className="flex text-start flex-col gap-1">
                <p className="font-nav font-medium">Backend engineer</p>
                <p className="font-body text-textColor-secondary">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
            </div>
            {/* recommended job UI  */}
            <div className="flex gap-3 items-center">
              <img
                src="https://plus.unsplash.com/premium_photo-1750063400799-d3d386a86c36?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8"
                alt=""
                className="w-16 h-16 object-cover"
              />

              <div className="flex text-start flex-col gap-1">
                <p className="font-nav font-medium">Web Developer</p>
                <p className="font-body text-textColor-secondary">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
            </div>
            {/* recommended job UI  */}
            <div className="flex gap-3 items-center">
              <img
                src="https://images.unsplash.com/photo-1750008267598-7f68e1a25ab8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw4fHx8ZW58MHx8fHx8"
                alt=""
                className="w-16 h-16 object-cover"
              />

              <div className="flex text-start flex-col gap-1">
                <p className="font-nav font-medium">Web Designer</p>
                <p className="font-body text-textColor-secondary">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* resume upload button  */}
    </section>
  );
}
