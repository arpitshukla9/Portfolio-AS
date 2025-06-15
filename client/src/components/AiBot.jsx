import React from "react";

const AIBotAvatar = () => {
  return (
    <div
      id="ai-bot-avatar"
      className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-50 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16"
      onClick={() => alert("AI ChatBot Coming Soon...")}
    >
      <img
        src="/images/ThetaAvatar.png"
        alt="AI Bot"
        className="w-full h-full rounded-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
      />
    </div>
  );
};

export default AIBotAvatar;
