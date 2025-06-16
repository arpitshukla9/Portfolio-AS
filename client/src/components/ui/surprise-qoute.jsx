import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  X,
  Quote,
  RefreshCw,
  Code,
  Zap,
  Terminal,
  Layers,
  Cpu,
  BookOpen,
  Rocket,
  Smile,
  GitBranch,
  Shield,
  Database,
  Server,
  Clock,
} from "lucide-react";
import { developerQuotes } from "../../store/Qoutes";

const FloatingParticles = ({ color, count = 20 }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: color }}
          initial={{
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
            opacity: 0,
          }}
          animate={{
            x: [
              Math.random() * 100 + "%",
              Math.random() * 100 + "%",
              Math.random() * 100 + "%",
            ],
            y: [
              Math.random() * 100 + "%",
              Math.random() * 100 + "%",
              Math.random() * 100 + "%",
            ],
            opacity: [0, 0.8, 0],
            scale: [0.5, 1.5, 0.5],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

const TypewriterEffect = ({ text, onComplete, speed = 20 }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed + Math.random() * 20);
      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, onComplete, speed]);

  useEffect(() => {
    setDisplayText("");
    setCurrentIndex(0);
  }, [text]);

  return (
    <span className="relative">
      {displayText}
      <motion.span
        className="inline-block w-0.5 h-6 bg-current ml-1"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
      />
    </span>
  );
};

const SurpriseModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [color, setColor] = useState("#6366f1");
  const [gradient, setGradient] = useState(
    "from-indigo-600 via-purple-600 to-pink-600"
  );
  const [typingComplete, setTypingComplete] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });
  const buttonRef = useRef(null);
  const [buttonPosition, setButtonPosition] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setButtonPosition({
          x: rect.left,
          y: rect.top,
          width: rect.width,
          height: rect.height,
        });
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initialize values
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setButtonPosition({
        x: rect.left,
        y: rect.top,
        width: rect.width,
        height: rect.height,
      });
    }
  }, [showModal]);

  const getRandomQuote = () => {
    setLoading(true);
    setQuote(null);
    setTypingComplete(false);

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * developerQuotes.length);
      const selectedQuote = developerQuotes[randomIndex];

      setQuote(selectedQuote);
      setLoading(false);
      setColor(getRandomColor());
      setGradient(getRandomGradient());
    }, 500);
  };

  const getRandomColor = () => {
    const colors = [
      "#6366f1",
      "#8b5cf6",
      "#ec4899",
      "#06b6d4",
      "#10b981",
      "#f59e0b",
      "#ef4444",
      "#a855f7",
      "#3b82f6",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const getRandomGradient = () => {
    const gradients = [
      "from-indigo-600 via-purple-600 to-pink-600",
      "from-blue-600 via-purple-600 to-indigo-600",
      "from-emerald-500 via-cyan-500 to-blue-500",
      "from-pink-500 via-red-500 to-yellow-500",
      "from-purple-600 via-pink-600 to-blue-600",
      "from-indigo-500 via-purple-500 to-pink-500",
      "from-cyan-500 via-blue-500 to-indigo-600",
      "from-violet-600 via-purple-600 to-fuchsia-600",
    ];
    return gradients[Math.floor(Math.random() * gradients.length)];
  };

  const getCategoryIcon = (category) => {
    const icons = {
      coding: Code,
      debugging: Terminal,
      development: Code,
      web: Layers,
      javascript: Code,
      python: Terminal,
      java: Cpu,
      "c++": Cpu,
      learning: BookOpen,
      career: Rocket,
      humor: Smile,
      productivity: Zap,
      innovation: Sparkles,
      teamwork: GitBranch,
      security: Shield,
      future: Rocket,
      algorithm: Database,
      database: Database,
      server: Server,
      time: Clock,
    };
    return icons[category.toLowerCase()] || Code;
  };

  const handleClick = () => {
    setClickCount((prev) => prev + 1);
    if (!showModal) {
      setShowModal(true);
      getRandomQuote();
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setTypingComplete(false);
  };

  const refreshQuote = () => {
    getRandomQuote();
  };

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
      // Only add padding if needed (not on mobile or if scrollbar is overlay)
      if (window.innerWidth > 640 && document.body.scrollHeight > document.body.clientHeight) {
        document.body.style.paddingRight = "15px";
      }
    } else {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0";
    }

    return () => {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0";
    };
  }, [showModal, windowSize.width]);

  return (
    <div className="w-full flex justify-center px-4">
      <motion.button
        ref={buttonRef}
        onClick={handleClick}
        className={`w-full max-w-[320px] px-4 py-3 sm:px-6 sm:py-3 bg-gradient-to-r ${gradient} text-white text-sm sm:text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out flex items-center justify-center gap-2`}
        whileHover={{
          scale: 1.05,
          boxShadow:
            "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        }}
        whileTap={{
          scale: 0.97,
          boxShadow:
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 15,
        }}
      >
        <motion.div
          animate={{
            rotate: clickCount % 2 === 0 ? [0, 10, -10, 0] : [0, -10, 10, 0],
          }}
          transition={{ duration: 0.6 }}
        >
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
        </motion.div>
        <span>Developer Quotes</span>
      </motion.button>

      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[999] flex items-center justify-center p-0 sm:p-4 min-h-screen" 
            onClick={closeModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <motion.div
              className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto rounded-t-2xl sm:rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 relative overflow-hidden flex flex-col"
              style={{
                maxHeight: "70vh", 
                marginTop: "0",
                marginLeft: "0",
                marginRight: "0",
              }}
              initial={{
                scale: 0.95,
                opacity: 0,
                y: 10,
              }}
              animate={{
                scale: 1,
                opacity: 1,
                y: 0,
              }}
              exit={{
                scale: 0.95,
                opacity: 0,
                y: 20, // Simplified exit y value
              }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 400,
                mass: 0.5,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <FloatingParticles
                color={color}
                count={windowSize.width < 640 ? 20 : 40}
              />

              <div className="relative z-10 p-4 sm:p-6 md:p-8 flex-1 flex flex-col overflow-y-auto">
                <button
                  onClick={closeModal}
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 p-1 sm:p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="mb-4 sm:mb-6">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <div
                      className={`p-2 rounded-lg bg-gradient-to-r ${gradient} text-white shadow-md`}
                    >
                      <Quote className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                      Developer Inspiration
                    </h2>
                  </div>

                  {quote && (
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 px-2 py-1 sm:px-3 sm:py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-full capitalize">
                        {React.createElement(getCategoryIcon(quote.category), {
                          className: "w-3 h-3",
                        })}
                        {quote.category}
                      </span>
                    </div>
                  )}
                </div>

                {loading ? (
                  <div className="flex-1 flex flex-col items-center justify-center py-6 sm:py-8">
                    <motion.div
                      className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-gray-200 dark:border-gray-700 border-t-current rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    <motion.p
                      className="text-gray-500 dark:text-gray-400 mt-3 sm:mt-4 text-xs sm:text-sm"
                      animate={{ opacity: [0.6, 1, 0.6] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      Loading wisdom...
                    </motion.p>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col">
                    <div className="space-y-4 sm:space-y-6 flex-1">
                      {quote && (
                        <>
                          <blockquote className="text-base sm:text-lg md:text-xl leading-relaxed sm:leading-loose text-gray-800 dark:text-gray-200">
                            <TypewriterEffect
                              text={`"${quote.content}"`}
                              onComplete={() => setTypingComplete(true)}
                              speed={windowSize.width < 640 ? 10 : 20}
                            />
                          </blockquote>

                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{
                              opacity: typingComplete ? 1 : 0,
                              y: typingComplete ? 0 : 10,
                            }}
                            transition={{
                              delay: 0.5,
                              type: "spring",
                              stiffness: 300,
                            }}
                            className="pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-800 flex justify-end"
                          >
                            <cite className="text-xs sm:text-sm md:text-base font-medium text-gray-500 dark:text-gray-400 not-italic">
                              — {quote.author}
                            </cite>
                          </motion.div>
                        </>
                      )}
                    </div>

                    <motion.button
                      onClick={refreshQuote}
                      whileHover={{
                        scale: 1.02,
                        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                      }}
                      whileTap={{
                        scale: 0.98,
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                      }}
                      className={`mt-6 sm:mt-8 w-full flex items-center justify-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r ${gradient} hover:shadow-lg text-white rounded-lg sm:rounded-xl shadow-md transition-all font-medium text-xs sm:text-sm md:text-base ${
                        loading ? "opacity-70 cursor-not-allowed" : ""
                      }`}
                      disabled={loading}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <motion.div
                        animate={loading ? { rotate: 360 } : {}}
                        transition={
                          loading
                            ? {
                                duration: 1,
                                repeat: Infinity,
                                ease: "linear",
                              }
                            : {}
                        }
                      >
                        <RefreshCw className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                      </motion.div>
                      <span>New Quote</span>
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default SurpriseModal;