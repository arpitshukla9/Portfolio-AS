import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiCode,
  FiCpu,
  FiLayers,
  FiChevronRight,
  FiArrowRight,
  FiSearch,
} from "react-icons/fi";
import {
  SiLeetcode,
  SiJavascript,
  SiPython,
  SiReact,
  SiNodedotjs,
  SiDocker,
} from "react-icons/si";

const Playground = () => {
  const [activeTab, setActiveTab] = useState("DSA");
  const [hoveredCard, setHoveredCard] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showComingSoon, setShowComingSoon] = useState(false);

  // Sample content data
  const content = {
    DSA: [
      {
        id: 1,
        title: "Array Mastery",
        difficulty: "Medium",
        platform: "LeetCode",
        questions: 15,
      },
      {
        id: 2,
        title: "Tree Traversal",
        difficulty: "Hard",
        platform: "CodeForces",
        questions: 8,
      },
      {
        id: 3,
        title: "Dynamic Programming",
        difficulty: "Advanced",
        platform: "LeetCode",
        questions: 20,
      },
    ],
    Development: [
      {
        id: 1,
        title: "React Patterns",
        difficulty: "Advanced",
        platform: "Frontend Mentor",
        questions: 12,
      },
      {
        id: 2,
        title: "API Design",
        difficulty: "Intermediate",
        platform: "Dev Challenges",
        questions: 5,
      },
    ],
    Roadmap: [
      {
        id: 1,
        title: "Frontend 2024",
        difficulty: "Beginner",
        platform: "Roadmap.sh",
        questions: "Step-by-step",
      },
    ],
  };

  const categories = [
    {
      id: "DSA",
      label: "Data Structures",
      icon: <FiCpu className="w-5 h-5" />,
      color: "from-blue-500 to-purple-600",
    },
    {
      id: "Development",
      label: "Web Development",
      icon: <FiCode className="w-5 h-5" />,
      color: "from-green-500 to-teal-600",
    },
    {
      id: "Roadmap",
      label: "Learning Paths",
      icon: <FiLayers className="w-5 h-5" />,
      color: "from-orange-500 to-pink-600",
    },
  ];

  const platformIcons = {
    LeetCode: <SiLeetcode className="text-orange-500" />,
    CodeForces: <SiPython className="text-blue-400" />,
    "Frontend Mentor": <SiJavascript className="text-yellow-300" />,
    "Dev Challenges": <SiJavascript className="text-yellow-300" />,
    "Roadmap.sh": <FiChevronRight className="text-purple-400" />,
    "React Docs": <SiReact className="text-blue-400" />,
    "Node.js Docs": <SiNodedotjs className="text-green-500" />,
    "Docker Docs": <SiDocker className="text-blue-400" />,
  };

  const difficultyColors = {
    Beginner: "bg-green-100 text-green-800",
    Medium: "bg-yellow-100 text-yellow-800",
    Intermediate: "bg-blue-100 text-blue-800",
    Hard: "bg-red-100 text-red-800",
    Advanced: "bg-purple-100 text-purple-800",
  };

  const filteredContent = content[activeTab].filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.platform.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.difficulty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleComingSoon = () => {
    setShowComingSoon(true);
    setTimeout(() => setShowComingSoon(false), 2000);
  };

  return (
    <div className="min-h-screen bg-skin-gradient text-skin-text transition-colors duration-300 px-4 py-8 sm:px-6 sm:py-10">
      {/* Background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-400 dark:bg-blue-600 filter blur-3xl opacity-10" />
        <div className="absolute bottom-1/3 right-1/3 w-72 h-72 rounded-full bg-purple-400 dark:bg-purple-600 filter blur-3xl opacity-10" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center mb-8 sm:mb-10"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-center">
            <span className="bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent-glow)] to-[var(--color-accent)] bg-clip-text text-transparent">
              Playground
            </span>
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300 text-base sm:text-lg text-center max-w-2xl">
            Master algorithms, conquer development challenges, and follow structured learning paths.
          </p>
        </motion.div>

        {/* Search and filter section */}
        <motion.div
          className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 sm:mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search resources..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Category tabs */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 w-full sm:w-auto">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setActiveTab(category.id);
                  setSearchQuery("");
                }}
                className={`px-4 py-2 text-sm sm:text-base rounded-lg font-medium flex items-center gap-2 transition-all ${
                  activeTab === category.id
                    ? `bg-gradient-to-r ${category.color} text-white shadow-md`
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
                }`}
              >
                {category.icon}
                <span className="hidden sm:inline">{category.label}</span>
                <span className="sm:hidden">{category.label.split(" ")[0]}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Content cards */}
        {filteredContent.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {filteredContent.map((item) => (
              <motion.div
                key={`${activeTab}-${item.id}`}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -5 }}
                className="relative rounded-xl overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
                onMouseEnter={() => setHoveredCard(item.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={handleComingSoon}
              >
                {/* Card content */}
                <div className="p-5 h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                      {platformIcons[item.platform] ||
                        platformIcons["React Docs"]}
                    </div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {item.platform}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-white">
                    {item.title}
                  </h3>

                  <div className="flex items-center gap-2 mb-4">
                    <span
                      className={`px-2 py-1 text-xs rounded-full font-medium ${difficultyColors[item.difficulty]}`}
                    >
                      {item.difficulty}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {typeof item.questions === "number"
                        ? `${item.questions} problems`
                        : item.questions}
                    </span>
                  </div>

                  <motion.button
                    whileHover={{ x: 5 }}
                    className="mt-auto flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium text-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleComingSoon();
                    }}
                  >
                    <span>Explore now</span>
                    <FiArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>

                {/* Hover effect */}
                {hoveredCard === item.id && (
                  <motion.div
                    className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 opacity-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            className="flex flex-col items-center justify-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="text-center max-w-md">
              <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">
                No resources found
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Try adjusting your search or filter criteria to find what you're
                looking for.
              </p>
            </div>
          </motion.div>
        )}

        {/* Coming soon notification */}
        <AnimatePresence>
          {showComingSoon && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50"
            >
              <FiCode className="w-5 h-5" />
              <span>Coming soon! We're working on this feature.</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Playground;