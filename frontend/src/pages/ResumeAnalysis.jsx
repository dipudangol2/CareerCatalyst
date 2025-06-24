import React, { useState, useEffect } from "react";
import CircularProgress from "../components/CircularProgress";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function ResumeAnalysis() {
  const [progress, setProgress] = useState(0);
  const resumeData = JSON.parse(localStorage.getItem("resumeData"));

  console.log(resumeData);
  const demoDataKeys = Object.keys(resumeData["score_breakdown"]);
  const demoDataValues = demoDataKeys.map(
    (item) => resumeData["score_breakdown"][item]
  );

  const chartData = {
    labels: demoDataKeys.map((item) => item),
    datasets: [
      {
        label: "Value (%)",
        data: demoDataValues.map((item) => item),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Analysis of resume",
        font: {
          size: 18,
          family: "Inter, sans-serif",
        },
        color: "#333",
      },
      tooltip: {
        backgroundColor: "rgba(0,0,0,0.7)",
        bodyFont: {
          family: "Inter, sans-serif",
        },
        titleFont: {
          family: "Inter, sans-serif",
        },
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y + "%";
            }
            return label;
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Item Key",
          font: {
            size: 14,
            family: "Inter, sans-serif",
          },
          color: "#555",
        },
        ticks: {
          font: {
            family: "Inter, sans-serif",
          },
        },
      },
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: "Value (%)",
          font: {
            size: 14,
            family: "Inter, sans-serif",
          },
          color: "#555",
        },
        ticks: {
          callback: function (value) {
            return value + "%";
          },
          font: {
            family: "Inter, sans-serif",
          },
        },
      },
    },
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= parseInt(resumeData["overall_score"])) {
          clearInterval(timer);
          return parseInt(resumeData["overall_score"]);
        }
        return prev + 1;
      });

      () => clearInterval(timer);
    }, 20);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="section-css gap-5">
      <h5 className="text-start font-nav font-semibold">
        Overview of Your <span className="text-accent-secondary">Resume</span>
      </h5>

      {/* progress bar  */}
      <div className="flex flex-col gap-5">
        <p className="text-start text-textColor-primary font-medium font-nav">
          Overall score
        </p>

        <div className="relative mt-4 px-[100px] w-fit flex-center">
          <CircularProgress progress={progress} />
        </div>
      </div>

      {/* chart visualization */}
      <div className="relative h-[500px] w-full mt-15">
        <p className="text-start text-textColor-primary font-medium font-nav">
          Analysis overview
        </p>
        <Bar data={chartData} options={chartOptions} />
      </div>

      {/* strengths and weakness  */}
      <div>
        <p className="text-start text-textColor-primary font-medium font-nav mt-15">
          Strengths and Weaknesses
        </p>
        <div className="flex flex-col gap-5 mt-5">
          <div>
            <p className="text-start text-textColor-secondary font-nav">
              Strengths
            </p>
            <div className="flex flex-col gap-5 mt-2 px-3">
              {resumeData["strengths"].map((strength, index) => (
                <p
                  key={index}
                  className="text-start text-textColor-secondary font-nav text-sm"
                >
                  ✅ {strength}
                </p>
              ))}
            </div>
          </div>

          <div>
            <p className="text-start text-textColor-secondary font-nav">
              Weakness
            </p>
            <div className="flex flex-col gap-5 mt-2 px-3">
              {resumeData["weaknesses"].map((weakness, index) => (
                <p
                  key={index}
                  className="text-start text-textColor-secondary font-nav text-sm"
                >
                  ❌ {weakness}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* missing skills  */}
      <div className="mt-5">
        <p className="text-start text-textColor-primary font-medium font-nav mt-5">
          Missing Skills
        </p>
        <div className="flex flex-col gap-5 mt-3 px-3">
          {resumeData["missing_skills"].map((item, index) => {
            return (
              <div key={index}>
                <p className="text-start text-textColor-secondary font-nav text-sm">
                  <span className="text-textColor-primary text-2xl font-bold mr-3">
                    .
                  </span>
                  {item}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* improvements  */}
      <div className="mt-5">
        <p className="text-start text-textColor-primary font-medium font-nav mt-5">
          Improvement Tips
        </p>

        <ol className="mt-5">

          {resumeData['improvements'].map((item, index) => {
            return (
              <li key={index} className="text-start space-y-3 mt-3 px-4 py-5 shadow-md">
                <p className="text-textColor-secondary text-sm"><span className="font-bold mr-3 text-md"> Section: </span>{item.section}</p>
                <p className="text-textColor-secondary text-sm"><span className="font-bold mr-3 text-md"> Example: </span>{item.example}</p>
                <p className="text-textColor-secondary text-sm"><span className="font-bold mr-3 text-md"> Suggestion: </span>{item.suggestion}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
