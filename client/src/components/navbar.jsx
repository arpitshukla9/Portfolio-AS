import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle.jsx";
import SurpriseModal from "./ui/surprise-qoute.jsx";

function Navbar() {
  const [activeItem, setActiveItem] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const navRef = useRef(null);
  const navigate = useNavigate();

  const navItems = [
    { id: "home", label: "Home" },
    { id: "collab", label: "Collab" },
    { id: "work", label: "Work" },
    { id: "thinking", label: "Thinking" },
    { id: "lab", label: "Lab" },
    { id: "blog", label: "Blog" },
    { id: "contact", label: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const scrollPosition = window.scrollY + 100;
      for (const item of navItems) {
        const section = document.getElementById(item.id);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveItem(item.id);
            break;
          }
        }
      }
    };

    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleNavClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      setTimeout(() => {
        window.scrollTo({
          top: element.offsetTop - 80,
          behavior: "smooth"
        });
      }, 300);
    } else {
      navigate(`/${id}`);
    }
    setMobileMenuOpen(false);
  };

  return (
    <motion.div
      ref={navRef}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 ${
        scrolled
          ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-lg shadow-black/10 dark:shadow-gray-800/10 border-b border-white/20 dark:border-gray-700/20"
          : "bg-gradient-to-r from-slate-50/90 to-white/90 dark:from-gray-900/90 dark:to-gray-800/90 backdrop-blur-lg"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center">
            <div className="p-[2px] rounded-full bg-gradient-to-tr from-emerald-400 via-teal-400 to-cyan-400">
              <img
                src="/images/logo.jpg"
                alt="Logo"
                className="w-12 h-12 rounded-full object-cover bg-white p-1 shadow-md hover:scale-105 hover:shadow-cyan-400 transition-transform duration-300"
              />
            </div>
          </div>

          <div className="scale-90 md:scale-75 max-w-xs">
            <SurpriseModal />
          </div>

          <nav className="hidden lg:flex items-center">
            <ul className="flex items-center space-x-1 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl px-2 py-2 shadow-lg shadow-black/5 dark:shadow-gray-900/10 border border-white/20 dark:border-gray-700/20">
              {navItems.map((item) => (
                <li key={item.id} className="relative">
                  <motion.button
                    onClick={() => handleNavClick(item.id)}
                    onHoverStart={() => setHoveredItem(item.id)}
                    onHoverEnd={() => setHoveredItem(null)}
                    className={`relative px-5 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 group overflow-hidden ${
                      activeItem === item.id
                        ? "text-white dark:text-gray-900 shadow-lg shadow-emerald-500/25 dark:shadow-emerald-400/25"
                        : "text-slate-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white"
                    }`}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {activeItem === item.id && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 dark:from-emerald-400 dark:via-teal-400 dark:to-cyan-400 rounded-xl"
                        layoutId="activeNavItem"
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </motion.button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden lg:block">
              <ThemeToggle />
            </div>
            <motion.div className="lg:hidden" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-lg hover:shadow-xl transition-all duration-300"
                aria-label="Toggle menu"
              >
                <div className="space-y-2">
                  <motion.div
                    className="w-6 h-0.5 bg-slate-700 dark:bg-gray-300 rounded-full"
                    animate={{
                      rotate: mobileMenuOpen ? 45 : 0,
                      y: mobileMenuOpen ? 7 : 0,
                    }}
                  />
                  <motion.div
                    className="w-6 h-0.5 bg-slate-700 dark:bg-gray-300 rounded-full"
                    animate={{ opacity: mobileMenuOpen ? 0 : 1 }}
                  />
                  <motion.div
                    className="w-6 h-0.5 bg-slate-700 dark:bg-gray-300 rounded-full"
                    animate={{
                      rotate: mobileMenuOpen ? -45 : 0,
                      y: mobileMenuOpen ? -7 : 0,
                    }}
                  />
                </div>
              </button>
            </motion.div>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden overflow-hidden mt-4"
            >
              <motion.ul className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl p-2 shadow-xl shadow-black/10 dark:shadow-gray-900/10 border border-white/20 dark:border-gray-700/20">
                {navItems.map((item) => (
                  <motion.li
                    key={item.id}
                    className="mb-1 last:mb-0"
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <button
                      onClick={() => handleNavClick(item.id)}
                      className={`relative w-full px-5 py-3.5 text-sm font-semibold rounded-xl transition-all duration-300 group overflow-hidden ${
                        activeItem === item.id
                          ? "text-white dark:text-gray-900 shadow-md shadow-emerald-500/20 dark:shadow-emerald-400/20"
                          : "text-slate-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white"
                      }`}
                    >
                      {activeItem === item.id && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 dark:from-emerald-400 dark:via-teal-400 dark:to-cyan-400 rounded-xl"
                          layoutId="activeMobileNavItem"
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                          }}
                        />
                      )}
                      <span className="relative z-10">{item.label}</span>
                    </button>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default Navbar;
