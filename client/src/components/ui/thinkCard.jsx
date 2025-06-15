import React from "react";
import { motion } from "framer-motion";
import { Instagram, Linkedin, Code2, Cpu, Rocket, Layers } from "lucide-react";

const cardData = [
  {
    title: "Product Visionary & Builder",
    text: "Building next-gen platforms like ThetaVerse and InstaDukan — empowering India's digital creators with seamless, scalable, and delightful tools.",
    instagram: "https://instagram.com/thetaaverse",
    linkedin: "https://linkedin.com/in/arpitshukla9",
    icon: <Rocket className="w-6 h-6 text-purple-400" />,
    accent: "purple-400",
    border: "border-purple-500/20",
    hover: "hover:border-purple-400/30"
  },
  {
    title: "Generative AI Integrator",
    text: "Integrating GenAI into real-world products — from conversational UI to AI-led editors — to drive intelligent user experiences and automate creation workflows.",
    instagram: "https://instagram.com/thetaaverse",
    linkedin: "https://linkedin.com/in/arpitshukla9",
    icon: <Cpu className="w-6 h-6 text-blue-400" />,
    accent: "blue-400",
    border: "border-blue-500/20",
    hover: "hover:border-blue-400/30"
  },
  {
    title: "DevOps & Microservices Architect",
    text: "Designing scalable, containerized systems with CI/CD, microservices, and observability — ensuring high availability and performance.",
    instagram: "https://instagram.com/thetaaverse",
    linkedin: "https://linkedin.com/in/arpitshukla9",
    icon: <Layers className="w-6 h-6 text-amber-400" />,
    accent: "amber-400",
    border: "border-amber-500/20",
    hover: "hover:border-amber-400/30"
  },
  {
    title: "Full-Cycle Indie Engineer",
    text: "From wireframes to deployment, I independently own product development — optimizing for speed, clarity, and founder-first execution.",
    instagram: "https://instagram.com/thetaaverse",
    linkedin: "https://linkedin.com/in/arpitshukla9",
    icon: <Code2 className="w-6 h-6 text-emerald-400" />,
    accent: "emerald-400",
    border: "border-emerald-500/20",
    hover: "hover:border-emerald-400/30"
  },
];

const cardVariants = {
  offscreen: { y: 50, opacity: 0 },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", bounce: 0.4, duration: 0.8 }
  }
};

const ThinkingCard = () => {
  return (
    <div
      className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8"
      style={{ background: "var(--color-gradient)" }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-purple-900 rounded-full blur-3xl opacity-10 animate-float" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-blue-900 rounded-full blur-3xl opacity-10 animate-float-delay" />
      </div>
      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cardData.map((card, index) => (
            <motion.div
              key={index}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, margin: "-100px" }}
              variants={cardVariants}
              transition={{ delay: index * 0.1 }}
              className={`relative group h-full p-6 rounded-3xl backdrop-blur-lg border ${card.border} ${card.hover} shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_50px_rgba(109,40,217,0.2)] transition-all duration-500`}
            >
              <div className="absolute inset-0 overflow-hidden rounded-3xl">
                <div className={`absolute -inset-1 bg-gradient-to-br from-${card.accent} to-transparent opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-700 rounded-3xl`} />
              </div>
              <div className="relative z-10 h-full flex flex-col">
                <div className="mb-4 p-3 w-12 h-12 flex items-center justify-center bg-transparent rounded-xl shadow-lg border border-gray-600/30">
                  {card.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                  {card.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
                  {card.text}
                </p>
                <div className="flex space-x-3 mt-auto">
                  <motion.a
                    href={card.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-700/20 dark:bg-gray-700 backdrop-blur-md border border-gray-600/30 text-gray-600 dark:text-gray-300 hover:text-pink-500 transition-all duration-300 shadow-lg"
                  >
                    <Instagram className="w-5 h-5" />
                  </motion.a>
                  <motion.a
                    href={card.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-700/20 dark:bg-gray-700 backdrop-blur-md border border-gray-600/30 text-gray-600 dark:text-gray-300 hover:text-sky-500 transition-all duration-300 shadow-lg"
                  >
                    <Linkedin className="w-5 h-5" />
                  </motion.a>
                </div>
              </div>
              <div className={`absolute -bottom-5 -right-5 w-24 h-24 rounded-full bg-${card.accent} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity duration-700`} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThinkingCard;
