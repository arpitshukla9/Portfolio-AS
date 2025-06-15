import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCode, FiCpu, FiDatabase, FiCloud, FiServer } from "react-icons/fi";

const Skills = () => {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [isPulsing, setIsPulsing] = useState(false);

  // Pulsing effect for the title
  useEffect(() => {
    const interval = setInterval(() => {
      setIsPulsing(true);
      setTimeout(() => setIsPulsing(false), 1000);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const skillsData = [
    {
      icon: "https://raw.githubusercontent.com/marwin1991/profile-technology-icons/main/icons/javascript.png",
      title: "JavaScript",
      category: "Frontend",
    },
    {
      icon: "https://raw.githubusercontent.com/marwin1991/profile-technology-icons/main/icons/react.png",
      title: "React",
      category: "Frontend",
    },
    {
      icon: "https://raw.githubusercontent.com/marwin1991/profile-technology-icons/main/icons/typescript.png",
      title: "TypeScript",
      category: "Frontend",
    },
    {
      icon: "https://raw.githubusercontent.com/marwin1991/profile-technology-icons/main/icons/node_js.png",
      title: "Node.js",
      category: "Backend",
    },
    {
      icon: "https://raw.githubusercontent.com/marwin1991/profile-technology-icons/main/icons/express.png",
      title: "Express",
      category: "Backend",
    },
    {
      icon: "https://raw.githubusercontent.com/marwin1991/profile-technology-icons/main/icons/redux.png",
      title: "Redux",
      category: "Frontend",
    },
    {
      icon: "https://raw.githubusercontent.com/marwin1991/profile-technology-icons/main/icons/next_js.png",
      title: "Next.js",
      category: "Fullstack",
    },
    {
      icon: "https://raw.githubusercontent.com/marwin1991/profile-technology-icons/main/icons/java.png",
      title: "Java",
      category: "Backend",
    },
    {
      icon: "https://raw.githubusercontent.com/marwin1991/profile-technology-icons/main/icons/python.png",
      title: "Python",
      category: "Backend",
    },
    {
      icon: "https://raw.githubusercontent.com/marwin1991/profile-technology-icons/main/icons/postgresql.png",
      title: "PostgreSQL",
      category: "Database",
    },
    {
      icon: "https://raw.githubusercontent.com/marwin1991/profile-technology-icons/main/icons/mysql.png",
      title: "MySQL",
      category: "Database",
    },
    {
      icon: "https://raw.githubusercontent.com/marwin1991/profile-technology-icons/main/icons/redis.png",
      title: "Redis",
      category: "Database",
    },
    {
      icon: "https://raw.githubusercontent.com/marwin1991/profile-technology-icons/main/icons/mongodb.png",
      title: "MongoDB",
      category: "Database",
    },
    {
      icon: "https://raw.githubusercontent.com/marwin1991/profile-technology-icons/main/icons/docker.png",
      title: "Docker",
      category: "DevOps",
    },
    {
      icon: "https://raw.githubusercontent.com/marwin1991/profile-technology-icons/main/icons/kubernetes.png",
      title: "Kubernetes",
      category: "DevOps",
    },
    {
      icon: "https://raw.githubusercontent.com/marwin1991/profile-technology-icons/main/icons/gcp.png",
      title: "Google Cloud",
      category: "DevOps",
    },
    {
      icon: "https://raw.githubusercontent.com/marwin1991/profile-technology-icons/main/icons/kafka.png",
      title: "Kafka",
      category: "Backend",
    },
    {
      icon: "https://raw.githubusercontent.com/marwin1991/profile-technology-icons/main/icons/git.png",
      title: "Github",
      category: "Tools",
    },
  ];

  const categories = [
    { name: "All", icon: <FiCode /> },
    { name: "Frontend", icon: <FiCpu /> },
    { name: "Backend", icon: <FiServer /> },
    { name: "Database", icon: <FiDatabase /> },
    { name: "DevOps", icon: <FiCloud /> },
  ];

  const filteredSkills =
    activeCategory === "All"
      ? skillsData
      : skillsData.filter((skill) => skill.category === activeCategory);

  return (
    <div className="min-h-screen bg-[var(--color-base)] text-[var(--color-text)] p-4 sm:p-6 md:p-10 lg:p-16 transition-colors duration-300">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-52 h-52 sm:w-64 sm:h-64 bg-[var(--color-accent)] rounded-full blur-3xl opacity-10 animate-float"></div>
        <div className="absolute bottom-1/3 right-1/3 w-60 h-60 sm:w-72 sm:h-72 bg-[var(--color-accent-glow)] rounded-full blur-3xl opacity-10 animate-float-delay"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12"
        >
          <h2 className="text-3xl p-4 sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent-glow)] to-[var(--color-accent)] bg-clip-text text-transparent text-center">
          My Lab
        </h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-base sm:text-lg md:text-xl text-[var(--color-heading)] max-w-3xl mx-auto"
          >
            Tools & technologies I use to build exceptional digital experiences
          </motion.p>
        </motion.div>

        {/* Category Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 md:mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category.name}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setActiveCategory(category.name)}
              className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-md sm:rounded-lg text-sm sm:text-base transition-all ${
                activeCategory === category.name
                  ? "bg-[var(--color-accent)]  text-white"
                  : "bg-[var(--glass-bg)] border border-[var(--color-border)] text-[var(--color-text)] hover:bg-[var(--color-card)]"
              }`}
            >
              {category.icon}
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 sm:gap-5 md:gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <AnimatePresence>
            {filteredSkills.map((skill) => (
              <motion.div
                key={skill.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className={`relative h-24 sm:h-28 md:h-32 rounded-xl bg-[var(--glass-bg)] backdrop-blur-sm border ${
                  hoveredSkill === skill.title
                    ? "border-[var(--color-accent)] "
                    : "border-[var(--color-border)]"
                }`}
                onMouseEnter={() => setHoveredSkill(skill.title)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                {hoveredSkill === skill.title && (
                  <motion.div
                    className="absolute -bottom-4 -right-4 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[var(--color-accent)] blur-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.15 }}
                    transition={{ duration: 0.3 }}
                  />
                )}

                <div className="relative h-full flex flex-col items-center justify-center p-3 sm:p-4">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mb-2"
                  >
                    <img
                      src={skill.icon}
                      alt={skill.title}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </motion.div>
                  <motion.h3
                    whileHover={{ color: "var(--color-accent)" }}
                    className="text-xs sm:text-sm md:text-base font-medium text-center text-[var(--color-text)]"
                  >
                    {skill.title}
                  </motion.h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Filter Label */}
        {activeCategory !== "All" && (
          <motion.div
            className="fixed bottom-6 left-4 sm:left-8 z-10 hidden md:block"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
          >
            <div className="px-3 py-1.5 rounded-full bg-[var(--glass-bg)] backdrop-blur border border-[var(--color-border)] text-xs sm:text-sm font-medium text-[var(--color-heading)]">
              Showing: {activeCategory}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Skills;
