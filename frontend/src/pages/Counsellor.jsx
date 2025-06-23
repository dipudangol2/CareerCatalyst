import React from "react";
import {Link} from 'react-router-dom'
import CounsellorCardItem from "../components/CounsellorCardItem";

export default function Counsellor() {
  const dummyCounsellors = [
    {
      name: "Anjali Sharma",
      position: "Senior Career Strategist",
      description:
        "With over a decade of experience in career development, Anjali helps students and young professionals turn confusion into clarity through personalized mentoring and roadmap planning.",
      image:
        "https://images.unsplash.com/photo-1725028748781-7adb1df9a943?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fHww",
    },
    {
      name: "David Kim",
      position: "Tech Career Coach & Resume Reviewer",
      description:
        "David specializes in helping tech aspirants craft powerful resumes and portfolios that stand out to both AI tools and recruiters at top companies.",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fHww",
    },
    {
      name: "Fatima Noor",
      position: "Soft Skills & Communication Advisor",
      description:
        "Fatima brings empathy and insight to job-seekers, helping them improve their soft skills and ace behavioral interviews with confidence.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fHww",
    },
    {
      name: "Rohit Chhetri",
      position: "AI Career Consultant",
      description:
        "Rohit works at the intersection of AI and education, guiding learners on how to upskill and position themselves for high-demand roles in data and AI.",
      image:
        "https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fHww",
    },
    {
      name: "Melissa Grant",
      position: "Career Switch Mentor",
      description:
        "Melissa supports individuals making bold career changes, helping them highlight transferable skills and navigate unfamiliar industries successfully.",
      image:
        "https://plus.unsplash.com/premium_photo-1689551670902-19b441a6afde?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHJhbmRvbSUyMHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      name: "Jared Thompson",
      position: "Internship & Early Career Guide",
      description:
        "Jared specializes in helping students and fresh graduates break into the job market through smart internship strategies and portfolio-building advice.",
      image:
        "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHJhbmRvbSUyMHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      name: "Priyanka Desai",
      position: "Women in Tech Advocate",
      description:
        "Priyanka mentors aspiring female developers and designers, offering guidance on overcoming industry challenges and building impactful tech careers.",
      image:
        "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHJhbmRvbSUyMHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      name: "Marcus Bennett",
      position: "Remote Work & Freelance Advisor",
      description:
        "Marcus helps professionals transition into remote or freelance careers by teaching personal branding, client communication, and remote job sourcing.",
      image:
        "https://plus.unsplash.com/premium_photo-1669688174637-92ff26cc0a9b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHJhbmRvbSUyMHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D",
    },
  ];
  return (
    <section className="section-css">
      <h3 className="font-nav max-w-[500px] mx-auto font-semibold">
        Meet our Career Counsellors
      </h3>
      <p className="font-body lg:max-w-[75%] mx-auto">
        Get to meet our team of career counsellors and support staff
      </p>

      {/* counsellor card wrapper  */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-7">
        {dummyCounsellors.map((counsellor, index) => (
          <CounsellorCardItem
            key={index}
            name={counsellor.name}
            position={counsellor.position}
            description={counsellor.description}
            image={counsellor.image}
          />
        ))}
      </div>

      {/* we are hiring section  */}
      <div className="my-10 flex flex-col gap-3 text-center">
          <p className="font-medium font-body text-lg">We're hiring</p>
          <p className="font-body text-textColor-secondary">Join the counselling journey with us</p>
          <button className="btn-secondary mx-auto w-fit"><Link>Apply now</Link></button>
      </div>
    </section>
  );
}
