import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle.jsx";
import SurpriseModal from "./ui/surprise-qoute.jsx";

function Header() {
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
    { id: "playground", label: "Playground" },
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
          if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
          ) {
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
          behavior: "smooth",
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
          ? "bg-skin-base/95 backdrop-blur-xl shadow-[var(--shadow-glass)] border-b border-skin-border"
          : "bg-skin-gradient backdrop-blur-lg"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-3">
        <div className="flex items-center justify-between gap-3 sm:gap-4">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <div className="p-[2px] rounded-full bg-skin-accent">
              <img
                src="/images/logo.jpg"
                alt="Logo"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover bg-white p-1 shadow-md hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
          <div className="w-full flex justify-center items-center p-2 sm:p-4">
            <div className="scale-60 sm:scale-70 md:scale-90 transition-transform duration-300 ease-in-out max-w-[180px] sm:max-w-xs md:max-w-sm w-full">
              <SurpriseModal />
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center mx-auto">
            <ul className="flex items-center space-x-1 bg-skin-card backdrop-blur-sm rounded-2xl px-2 py-2 shadow-[var(--shadow-glass)] border border-skin-border">
              {navItems.map((item) => (
                <li key={item.id} className="relative">
                  <motion.button
                    onClick={() => handleNavClick(item.id)}
                    onHoverStart={() => setHoveredItem(item.id)}
                    onHoverEnd={() => setHoveredItem(null)}
                    className={`relative px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-300 group overflow-hidden ${
                      activeItem === item.id
                        ? "text-skin-base "
                        : "text-skin-text hover:text-skin-heading"
                    }`}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {activeItem === item.id && (
                      <motion.div
                        className="absolute inset-0 bg-skin-accent rounded-xl"
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

          {/* Theme Toggle + Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
            <motion.div
              className="md:hidden"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl bg-skin-card backdrop-blur-sm border border-skin-border shadow-[var(--shadow-glass)] transition-all duration-300"
                aria-label="Toggle menu"
              >
                <div className="space-y-1.5">
                  <motion.div
                    className="w-5 h-0.5 bg-skin-text rounded-full"
                    animate={{
                      rotate: mobileMenuOpen ? 45 : 0,
                      y: mobileMenuOpen ? 6 : 0,
                    }}
                  />
                  <motion.div
                    className="w-5 h-0.5 bg-skin-text rounded-full"
                    animate={{ opacity: mobileMenuOpen ? 0 : 1 }}
                  />
                  <motion.div
                    className="w-5 h-0.5 bg-skin-text rounded-full"
                    animate={{
                      rotate: mobileMenuOpen ? -45 : 0,
                      y: mobileMenuOpen ? -6 : 0,
                    }}
                  />
                </div>
              </button>
            </motion.div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden overflow-hidden mt-3"
            >
              <motion.ul className="bg-skin-card backdrop-blur-lg rounded-2xl p-2 shadow-[var(--shadow-glass)] border border-skin-border">
                {navItems.map((item) => (
                  <motion.li
                    key={item.id}
                    className="mb-1 last:mb-0"
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <button
                      onClick={() => handleNavClick(item.id)}
                      className={`relative w-full px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-300 group overflow-hidden ${
                        activeItem === item.id
                          ? "text-skin-base "
                          : "text-skin-text hover:text-skin-heading"
                      }`}
                    >
                      {activeItem === item.id && (
                        <motion.div
                          className="absolute inset-0 bg-skin-accent rounded-xl"
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
                <li className="mt-2 px-3">
                  <ThemeToggle />
                </li>
              </motion.ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default Header;
