import React from "react";
import "./thinkingcard.css";

const cardData = [
  {
    title: "Product Visionary & Builder",
    text: "Building next-gen platforms like ThetaVerse and InstaDukan — empowering India's digital creators with seamless, scalable, and delightful tools.",
    instagram: "https://instagram.com/thetaaverse",
    github: "https://github.com/arpitshukla9",
  },
  {
    title: "Generative AI Integrator",
    text: "Integrating GenAI into real-world products — from conversational UI to AI-led editors — to drive intelligent user experiences and automate creation workflows.",
    instagram: "https://instagram.com/thetaaverse",
    github: "https://github.com/arpitshukla9",
  },
  {
    title: "DevOps & Microservices Architect",
    text: "Designing scalable, containerized systems with CI/CD, microservices, and observability — ensuring high availability and performance.",
    instagram: "https://instagram.com/thetaaverse",
    github: "https://github.com/arpitshukla9",
  },
  {
    title: "Full-Cycle Indie Engineer",
    text: "From wireframes to deployment, I independently own product development — optimizing for speed, clarity, and founder-first execution.",
    instagram: "https://instagram.com/thetaaverse",
    github: "https://github.com/arpitshukla9",
  },
];

const ThinkingCard = () => {
  return (
    <div className="cards-grid">
      {cardData.map((card, index) => (
        <div className="parent" key={index}>
          <div className="card">
            <div className="glass"></div>
            <div className="content">
              <span className="title">{card.title}</span>
              <span className="text">{card.text}</span>
            </div>
            <div className="bottom">
              <div className="social-buttons-container">
                <a
                  href={card.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-button social-button4"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="svg"
                    viewBox="0 0 448 512"
                  >
                    <path
                      d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9 0 63.6 51.3 114.9 114.9 114.9 
           63.6 0 114.9-51.3 114.9-114.9 0-63.6-51.3-114.9-114.9-114.9zM398.8 97.2c0 
           14.9-12.1 27-27 27s-27-12.1-27-27c0-14.9 12.1-27 27-27s27 12.1 27 27zM224.1 
           338c-62.7 0-113.9-51.1-113.9-113.9 0-62.7 51.1-113.9 113.9-113.9 
           62.7 0 113.9 51.1 113.9 113.9 0 62.7-51.1 113.9-113.9 113.9zM398.8 
           96c-1.7-35.3-9.9-66.7-36.2-92.9C336.9 6.9 305.6-1.7 270.3 0 
           234 1.7 204.6 0 172.3 0 140 0 110.6 1.7 76.1 0c-35.3-1.7-66.7 6.9-92.9 
           33.1C-20.6 62.4-28.8 93.7-30.5 129c-1.7 36.3 0 65.7 0 98s-1.7 61.7 0 
           98c1.7 35.3 9.9 66.7 36.2 92.9 26.2 26.2 57.6 34.4 92.9 
           36.2 36.3 1.7 65.7 0 98 0s61.7 1.7 98 0c35.3-1.7 66.7-9.9 
           92.9-36.2 26.2-26.2 34.4-57.6 36.2-92.9 1.7-36.3 0-65.7 
           0-98s1.7-61.7 0-98z"
                    />
                  </svg>
                </a>
                <a
                  href={card.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-button social-button5"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="svg"
                    viewBox="0 0 448 512"
                  >
                    <path
                      d="M100.28 448H7.4V148.9h92.88zM447.8 448h-92.4V302.4
                    c0-34.7-12.4-58.4-43.4-58.4-23.6
                    0-37.6 15.9-43.8 31.3-2.3 5.6-2.8 13.4-2.8
                    21.2V448h-92.4s1.2-258.4
                    0-285h92.4v40.4c12.3-18.9 34.4-45.8
                    83.6-45.8 61 0 106.7 39.8
                    106.7 125.4V448z"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ThinkingCard;
