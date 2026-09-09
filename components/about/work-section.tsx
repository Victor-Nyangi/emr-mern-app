import React from "react";

const healthcareFeatures = [
  {
    icon: (
      <svg
        className="w-7 h-7 text-teal-600"
        strokeLinecap="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="10" stroke="currentColor" fill="none" />
        <path d="M12 6v6l4 2" stroke="currentColor" fill="none" />
      </svg>
    ),
    title: "Cancer Awareness",
    description:
      "Your health journey deserves tailored support, designed to fit your unique lifestyle.",
    points: ["Chronic care", "Preventive plans", "Remote monitoring"],
    link: "https://cancer-awareness.vercel.app",
  },
  {
    icon: (
      <svg
        className="w-7 h-7 text-teal-600 lg:w-10 lg:h-10"
        stroke="currentColor"
        viewBox="0 0 52 52"
      >
        <polygon
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          points="29 13 14 29 25 29 23 39 38 23 27 23"
        />
      </svg>
    ),
    title: "Healthy Diet",
    description:
      "Nutrition plans and meal guidance that help you stay strong, healthy and energized every day.",
    points: ["Balanced meals", "Personal nutrition", "Sustainable habits"],
    link: "https://meal-forge.netlify.app",
  },
  {
    icon: (
      <svg
        className="w-7 h-7 text-teal-600"
        strokeLinecap="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M12 4v16m8-8H4" stroke="currentColor" fill="none" />
      </svg>
    ),
    title: "Mental Health",
    description:
      "A collection of materials that support your emotional wellness and mental clarity through evidence-based approaches.",
    points: ["Counseling", "Mindfulness", "Stress management"],
    link: "https://soundsnare.vercel.app",
  },
  {
    icon: (
      <svg
        className="w-7 h-7 text-teal-600"
        strokeLinecap="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M5 12l5 5L20 7" stroke="currentColor" fill="none" />
      </svg>
    ),
    title: "Active Lifestyle",
    description:
      "Stay active and strong with programs designed to motivate and support you through all stages of fitness.",
    points: ["Fitness coaching", "Mobility support", "Rehabilitation"],
    link: "https://lit2bfit-astro.vercel.app",
  },
];

const WorkSection = () => {
  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="flex flex-col mb-6 lg:flex-row md:mb-10">
        <div className="lg:w-1/2">
          <h2 className="max-w-md mb-6 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none xl:max-w-lg">
            Your health, your way.
          </h2>
        </div>
        <div className="lg:w-1/2">
          <p className="text-base text-gray-700 md:text-lg">
            Empowering you to live a healthier, happier life with personalized
            care and holistic support.
          </p>
        </div>
      </div>
      <div className="grid gap-8 row-gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {healthcareFeatures.map((feature, index) => (
          <div key={index}>
            <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-green-50">
              {feature.icon}
            </div>
            <h6 className="mb-2 font-semibold leading-5">{feature.title}</h6>
            <p className="mb-3 text-sm text-gray-900">{feature.description}</p>
            <ul className="mb-4 -ml-1 space-y-2">
              {feature.points.map((point, idx) => (
                <li className="flex items-start" key={idx}>
                  <span className="mr-1">
                    <svg
                      className="w-5 h-5 mt-px text-teal-600"
                      stroke="currentColor"
                      viewBox="0 0 52 52"
                    >
                      <polygon
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        points="29 13 14 29 25 29 23 39 38 23 27 23"
                      />
                    </svg>
                  </span>
                  {point}
                </li>
              ))}
            </ul>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={feature.link}
              aria-label=""
              className="inline-flex items-center font-semibold transition-colors duration-200 text-teal-600 hover:font-bold hover:text-green-600 hover:underline"
            >
              Learn more
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkSection;
