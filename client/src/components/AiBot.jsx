import React, { useState, useEffect, useCallback } from "react";

const ThetaAIWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const toggleChat = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
  const handleShowBot = () => setIsOpen(true);
  document.addEventListener("show-ai-bot", handleShowBot);
  return () => document.removeEventListener("show-ai-bot", handleShowBot);
}, []);

  const handleHover = () => {
    if (!isLoaded) {
      const img = new Image();
      img.src = "https://ai-bot-swart.vercel.app";
      setIsLoaded(true);
    }
  };

  return (
    <div className="theta-ai-widget">
      {/* Floating Button */}
      <button
        aria-label="Chat with Theta AI"
        onClick={toggleChat}
        onMouseEnter={handleHover}
        className={`fixed bottom-4 right-4 z-50 w-14 h-14 md:w-16 md:h-16 cursor-pointer transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
          isOpen ? "transform translate-y-2 opacity-90" : ""
        }`}
      >
        <img
          id="ai-bot-avatar"
          src="/images/ThetaAvatar.png"
          alt="Theta AI"
          loading="lazy"
          width={64}
          height={64}
          className="w-full h-full rounded-full object-cover shadow-lg ring-2 ring-white dark:ring-gray-800"
        />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 z-50 w-[90vw] max-w-md h-[70vh] max-h-[600px] rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-all duration-300 ease-out">
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 to-purple-600"></div>
          <iframe
            src={isLoaded ? "https://ai-bot-swart.vercel.app" : undefined}
            title="Theta AI Chat"
            width="100%"
            height="100%"
            className="border-none"
            allow="clipboard-write"
            loading="eager"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            referrerPolicy="strict-origin-when-cross-origin"
            style={{
              overflow: "hidden",
              scrollbarWidth: "none", // Firefox
              msOverflowStyle: "none", // IE/Edge
              border: "none",
            }}
          />

          <button
            onClick={toggleChat}
            aria-label="Close chat"
            className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-500 dark:text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default ThetaAIWidget;
