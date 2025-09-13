import React from "react";
import { FaSearch, FaUsers, FaUser } from "react-icons/fa";

const HelpSection = () => {
  const items = [
    {
      icon: <FaSearch className="text-purple-600 text-3xl" />,
      title: "A better job - faster",
      description: "Find job listings from multiple sites - all in one place.",
      linkText: "Search job postings →",
      link: "#",
    },
    {
      icon: <FaUsers className="text-pink-500 text-3xl" />,
      title: "A helpful community",
      description: "Get answers & support from millions of workers like you.",
      linkText: "Explore Community →",
      link: "#",
    },
    {
      icon: <FaUser className="text-blue-500 text-3xl" />,
      title: "A standout profile",
      description: "Complete your profile and get better job matches.",
      linkText: "Start your profile →",
      link: "#",
    },

     {
      icon: <FaUsers className="text-pink-500 text-3xl" />,
      title: "A helpful community",
      description: "Get answers & support from millions of workers like you.",
      linkText: "Explore Community →",
      link: "#",
    },
  ];

  return (
    <div className="bg-blue-100 py-12 px-6">
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