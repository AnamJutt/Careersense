import React from "react";
import { FaSearch, FaUsers, FaUser } from "react-icons/fa";
import { FaFileAlt } from "react-icons/fa";
import { FaChartBar } from "react-icons/fa";
import { FaLightbulb } from "react-icons/fa";

const HelpSection = () => {
  const items = [
    { 
      icon: <FaUser className="text-blue-500 text-3xl" />,
      title: "User Management",
      description: "Manage user profiles, authentication credentials, and their job application history. Each user has a unique ID, role (e.g., job seeker), and record of applied jobs to personalize their experience.",
      linkText: "Start your Profile →",
      link: "#",
    },
    {

      icon: <FaFileAlt className="text-green-500 text-3xl" />,
      title: "Resume Storage",
      description: "Store uploaded resumes along with structured data such as name, skills, education, and experience. Each resume is parsed and analyzed to extract key details for ATS scoring and job matching.",
      linkText: "Upload your resume  →",
      link: "#",
    },
    {
      icon: <FaChartBar className="text-blue-500 text-3xl" />,
      title: "ATS Score Analysis",
      description: "Evaluate resumes using keyword matching, formatting, and overall ATS compatibility. The total score helps users understand how well their resume aligns with job descriptions and hiring criteria.",
      linkText: "Check your ATS score →",
      link: "#",
    },

     {
       icon: <FaLightbulb className="text-yellow-500 text-3xl" />,
      title: "Resume Suggestions",
      description: "Provide personalized feedback to improve resumes. Highlight specific improvement areas such as missing keywords, weak formatting, or unclear achievements to help users increase their ATS score.",
      linkText: "View resume suggestions →",
      link: "#",
    },

      {
      icon: <FaSearch className="text-purple-600 text-3xl" />,
      title: "Job Listings",
      description: "Access up-to-date job opportunities from platforms like LinkedIn and Indeed. Each listing includes the title, company, location, skills required, and description — used for personalized job recommendations based on ATS results.",
      linkText: "View recommended jobs →",
      link: "#",
    },
  ];

  return (
    <div className="bg-blue-100 py-12 px-6" id="products">
      <h2 className="text-center text-2xl font-bold text-gray-900 mb-10">
        Top ways to help you get ahead
      </h2>

      <div className="max-w-4xl mx-auto space-y-6">
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-white flex items-start gap-4 p-6 rounded-lg shadow-sm hover:shadow-md transition"
          >
            <div>{item.icon}</div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
              <p className="text-gray-600 text-sm mb-2">{item.description}</p>
              <a
                href={item.link}
                className="text-blue-600 font-medium hover:underline"
              >
                {item.linkText}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HelpSection;