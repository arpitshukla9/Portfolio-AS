"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

const LayoutGrid = ({ cards = [] }) => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleClose = () => {
    setSelectedCard(null);
  };

  return (
    <div className="relative w-full min-h-screen p-6 sm:p-8 md:p-12 bg-gray-900">
      {/* Background glow effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-purple-900 rounded-full filter blur-3xl opacity-10 animate-float"></div>
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-blue-900 rounded-full filter blur-3xl opacity-10 animate-float-delay"></div>
      </div>

      {/* Grid container */}
      <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="relative h-80 rounded-2xl overflow-hidden"
            onClick={() => handleCardClick(card)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Card background */}
            <div className="absolute inset-0 bg-gray-800/70 backdrop-blur-sm border border-gray-700/30 rounded-2xl overflow-hidden">
              {/* Hover effects */}
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

              {/* Image */}
              <motion.img
                src={card.thumbnail}
                alt={card.title}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
              />

              {/* Content overlay */}
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 via-black/40 to-transparent p-6">
                <h3 className="text-white text-xl font-bold">{card.title}</h3>
                <p className="text-gray-300 text-sm mt-2 line-clamp-2">
                  {card.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Expanded card overlay */}
      {selectedCard && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={handleClose}
        >
          {/* Backdrop */}
          <motion.div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />

          {/* Expanded card */}
          <motion.div 
            className="relative w-full max-w-4xl h-[80vh] bg-gray-800/90 backdrop-blur-lg rounded-2xl border border-gray-700/50 shadow-xl overflow-hidden"
            layoutId={`card-${selectedCard.id}`}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Expanded image */}
            <motion.img
              src={selectedCard.thumbnail}
              alt={selectedCard.title}
              className="absolute inset-0 w-full h-full object-cover"
              layoutId={`image-${selectedCard.id}`}
            />

            {/* Expanded content */}
            <motion.div 
              className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/60 to-transparent p-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <motion.h2 className="text-white text-3xl font-bold mb-4">
                {selectedCard.title}
              </motion.h2>
              <motion.p className="text-gray-300 text-lg mb-6">
                {selectedCard.description}
              </motion.p>
              <div className="flex gap-4">
                {selectedCard.githubLink && (
                  <motion.a
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    href={selectedCard.githubLink}
                    target="_blank"
                    className="px-4 py-2 bg-gray-700/80 rounded-lg text-white flex items-center gap-2"
                  >
                    <span>GitHub</span>
                  </motion.a>
                )}
                {selectedCard.liveLink && (
                  <motion.a
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    href={selectedCard.liveLink}
                    target="_blank"
                    className="px-4 py-2 bg-purple-600/90 rounded-lg text-white flex items-center gap-2"
                  >
                    <span>Live Demo</span>
                  </motion.a>
                )}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

// Example usage:
const PortfolioGrid = () => {
  const projects = [
    {
      id: 1,
      title: "JennyKiDuniya",
      description: "CSR storytelling platform highlighting unsung heroes with impact narratives.",
      thumbnail: "/images/jennykiduniya.png",
      githubLink: "https://github.com/yourusername/jennykiduniya",
      liveLink: "https://jennykiduniya.com"
    },
    // Add more projects...
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      <LayoutGrid cards={projects} />
    </div>
  );
};

export default LayoutGrid;