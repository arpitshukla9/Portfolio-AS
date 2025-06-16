"use client";
import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiGithub, FiExternalLink, FiClock } from "react-icons/fi";
import { toast } from "react-hot-toast";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiReact,
  SiSocketdotio,
  SiFirebase,
  SiOpenai,
  SiPython,
  SiFastapi
} from "react-icons/si";
import { Sparkles } from "lucide-react";
import { animateKiteDriftToBot } from "./ui/kite-animation.jsx";


const TechBadge = ({ icon: Icon, name }) => (
  <motion.span
    whileHover={{ y: -2 }}
    className="flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-gray-700/80 backdrop-blur-md border border-gray-600/30 text-gray-200"
  >
    <Icon className="w-3 h-3" />
    {name}
  </motion.span>
);

const CardContent = ({
  title,
  description,
  tags,
  stack,
  githubLink,
  liveLink,
  onLiveClick,
}) => {
  return (
    <div className="absolute inset-0 h-full w-full p-6 flex flex-col justify-between bg-gradient-to-t from-gray-900/90 via-gray-900/60 to-transparent">
      <div className="flex flex-wrap gap-2">
        {stack.map((tech, index) => (
          <TechBadge key={index} icon={tech.icon} name={tech.name} />
        ))}
      </div>

      <div className="flex items-center gap-3 mb-4">
        <motion.div
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-3 h-3 rounded-full bg-purple-400"
        />
        <h3 className="text-2xl font-bold text-gray-100 tracking-tight">
          {title}
        </h3>
      </div>

      <p className="text-gray-300 text-sm md:text-base opacity-90 leading-relaxed font-medium">
        {description}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {tags.map((tag, index) => (
          <motion.span
            key={index}
            whileHover={{ y: -2 }}
            className="px-3 py-1 rounded-full text-xs bg-gray-700/80 backdrop-blur-md border border-gray-600/30 text-gray-300"
          >
            {tag}
          </motion.span>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-3">
        {githubLink && (
          <motion.a
            whileHover={{ y: -3, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-gray-700/80 backdrop-blur-md border border-gray-600/30 text-gray-200 hover:text-purple-400 transition-colors"
          >
            <FiGithub className="w-4 h-4" />
          </motion.a>
        )}
        {liveLink ? (
          <motion.a
            whileHover={{ y: -3, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={liveLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onLiveClick}
            className="inline-flex items-center gap-1 px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-all duration-300"
          >
            Live <FiExternalLink className="w-3 h-3" />
          </motion.a>
        ) : (
          <motion.button
            whileHover={{ y: -3, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onLiveClick}
            className="inline-flex items-center gap-1 px-4 py-2 text-sm font-semibold text-white bg-gray-600 hover:bg-gray-700 rounded-md transition-all duration-300"
          >
            Coming Soon
          </motion.button>
        )}
      </div>
    </div>
  );
};



const LayoutGrid = ({ cards = [] }) => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleClose = useCallback(() => {
    setSelectedCard(null);
  }, []);

  return (
    <div className="relative w-full h-full">
      <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="relative h-64 sm:h-72 md:h-80 rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer group"
            onClick={() => setSelectedCard(card)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="absolute inset-0 bg-gray-800/70 backdrop-blur-sm border border-gray-700/30 rounded-xl sm:rounded-2xl overflow-hidden">
              {hoveredIndex === index && (
                <>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div
                    className="absolute -bottom-5 -right-5 w-24 h-24 rounded-full bg-purple-400 blur-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.15 }}
                    transition={{ duration: 0.5 }}
                  />
                </>
              )}

              <motion.img
                src={card.thumbnail}
                alt={card.content.props.title}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
                loading="lazy"
              />

              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 via-black/40 to-transparent p-4 sm:p-6">
                <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                  <motion.div
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-2 h-2 rounded-full bg-purple-400"
                  />
                  <h3 className="text-white text-base sm:text-lg font-bold">
                    {card.content.props.title}
                  </h3>
                </div>
                <p className="text-gray-300 text-xs sm:text-sm line-clamp-2">
                  {card.content.props.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedCard && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          >
            <motion.div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />

            <motion.div
              className="relative w-full max-w-4xl h-[80vh] bg-gray-800/90 backdrop-blur-lg rounded-2xl border border-gray-700/50 shadow-xl overflow-hidden"
              layoutId={`card-${selectedCard.id}`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, type: "spring" }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                src={selectedCard.thumbnail}
                alt={selectedCard.content.props.title}
                className="absolute inset-0 w-full h-full object-cover"
                layoutId={`image-${selectedCard.id}`}
              />
              {selectedCard.content}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function PortfolioGrid() {
  const [showComingSoon, setShowComingSoon] = useState(false);

  const handleComingSoon = useCallback((e) => {
    e.preventDefault();
    setShowComingSoon(true);
    setTimeout(() => setShowComingSoon(false), 2000);
  }, []);

  const cards = [
    {
      id: 1,
      content: (
        <CardContent
          title="JennyKiDuniya"
          description="CSR storytelling platform highlighting unsung heroes with impact narratives and corporate social responsibility integration."
          tags={["CSR", "Storytelling", "Social Impact"]}
          stack={[
            { icon: SiNextdotjs, name: "Next.js" },
            { icon: SiTailwindcss, name: "Tailwind" },
            { icon: SiNodedotjs, name: "Node.js" },
          ]}
          githubLink="https://github.com/yourusername/jennykiduniya"
          onLiveClick={handleComingSoon}
        />
      ),
      thumbnail: "/images/jennykiduniya.png",
    },
    {
      id: 2,
      content: (
        <CardContent
          title="InstaDukan (SaaS)"
          description="AI-powered eCommerce platform for micro-entrepreneurs with drag-and-drop store builder and WhatsApp integration."
          tags={["SaaS", "eCommerce", "AI Integration"]}
          stack={[
            { icon: SiReact, name: "React" },
            { icon: SiNodedotjs, name: "Node.js" },
            { icon: SiSocketdotio, name: "Socket.io" },
          ]}
          githubLink="https://github.com/yourusername/instadukan"
          onLiveClick={handleComingSoon}
        />
      ),
      thumbnail: "/images/InstaDukan.png",
    },
    {
      id: 3,
      content: (
        <CardContent
          title="Fundora"
          description="AI-assisted fundraising platform with community engagement features and real-time donation tracking."
          tags={["FinTech", "Crowdfunding", "AI"]}
          stack={[
            { icon: SiNextdotjs, name: "Next.js" },
            { icon: SiTailwindcss, name: "Tailwind" },
            { icon: SiFirebase, name: "Firebase" },
          ]}
          githubLink="https://github.com/yourusername/fundora"
          onLiveClick={handleComingSoon}
        />
      ),
      thumbnail: "/images/Fundora.png",
    },
    {
      id: 4,
      content: (
        <CardContent
          title="SilentSOS"
          description="Discreet emergency alert system with location tracking and instant notification delivery."
          tags={["Safety", "Real-time", "Mobile"]}
          stack={[
            { icon: SiReact, name: "React Native" },
            { icon: SiNodedotjs, name: "Node.js" },
            { icon: SiSocketdotio, name: "WebSockets" },
          ]}
          githubLink="https://github.com/yourusername/silentsos"
          onLiveClick={handleComingSoon}
        />
      ),
      thumbnail: "/images/SilentSOS.png",
    },
    {
      id: 5,
      content: (
        <CardContent
          title="🧠 ThetaBot AI — Smartest Chat Companion"
          description="An intelligent, real-time AI assistant built into your personal ecosystem. From code help to project suggestions and tech Q&A, ThetaBot is your 24x7 thinking partner — blending OpenAI with sleek UX, context-awareness, and lightning-fast responses."
          tags={["Conversational AI", "Real-time", "Personal Assistant"]}
          stack={[
            { icon: SiOpenai, name: "OpenAI GPT" },
            { icon: SiReact, name: "React" },
            { icon: SiTailwindcss, name: "Tailwind CSS" },
            { icon: SiNodedotjs, name: "Node.js" },
          ]}
          githubLink="https://github.com/arpitshukla9/thetabot"
          liveLink="https://thetabot.vercel.app"
          onLiveClick={(e) => {
            e.preventDefault();
            animateKiteDriftToBot(e.currentTarget);

            setTimeout(() => {
              toast.success("Press AI avatar to chat ✨");
            }, 600);
          }}
        />
      ),
      thumbnail: "/images/ThetaAvatar.png",
    },
    {
  id: 6,
  content: (
    <CardContent
      title="🎯 ThetaPrep AI — Elite Interview Accelerator"
      description="Your AI-powered career coach for mastering technical interviews and crafting standout resumes. ThetaPrep combines behavioral analysis with technical drilling—offering mock interviews, resume optimization, and competitive coding practice with real-time feedback and performance analytics."
      tags={["Career Tech", "Interview Prep", "ATS Optimization", "AI Coaching"]}
      stack={[
        { icon: SiOpenai, name: "GPT-4 Omni" },
        { icon: SiPython, name: "Python NLP" },
        { icon: SiReact, name: "React 18" },
        { icon: SiFastapi, name: "FastAPI" },
      ]}
      githubLink="https://github.com/arpitshukla9/thetaprep"
      liveLink="https://thetaprep.vercel.app"
      onLiveClick={(e) => {
        e.preventDefault();
        animateKiteDriftToBot(e.currentTarget);
        
        setTimeout(() => {
          toast.success("Try our AI mock interview simulator 🚀");
        }, 600);
      }}
    />
  ),
  thumbnail: "/images/ThetaPrep.png",
  badge: "PRO", // Optional premium badge
  premiumFeatures: [
    "Real-time voice analysis",
    "ATS score prediction",
    "Company-specific question banks",
    "Salary negotiation AI"
  ]
}
  ];

  return (
    <div className="min-h-screen bg-skin-gradient text-skin-text transition-colors duration-300 px-4 py-8 sm:px-6 sm:py-10 md:px-8 md:py-12 lg:px-12 lg:py-16">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-20 -left-20 w-96 h-96 bg-purple-900 rounded-full filter blur-3xl opacity-10"
          animate={{
            x: [0, 20, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-20 -right-20 w-96 h-96 bg-blue-900 rounded-full filter blur-3xl opacity-10"
          animate={{
            x: [0, -20, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5,
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent-glow)] to-[var(--color-accent)] bg-clip-text text-transparent"
          >
            Works
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-24 h-1 rounded-full bg-gradient-to-r from-purple-400 to-cyan-400 mx-auto mt-6"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 max-w-3xl mx-auto text-base sm:text-lg text-gray-400 leading-relaxed"
          >
            Cutting-edge solutions powered by modern technologies that deliver
            exceptional user experiences.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="relative rounded-3xl bg-gray-800/70 backdrop-blur-lg border border-gray-700/30 shadow-[0_20px_50px_rgba(0,0,0,0.3)] p-4 sm:p-6"
        >
          <LayoutGrid cards={cards} />
        </motion.div>
      </div>

      <AnimatePresence>
        {showComingSoon && (
          <motion.div
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <FiClock className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-sm sm:text-base">Coming soon! We're working on this project.</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}