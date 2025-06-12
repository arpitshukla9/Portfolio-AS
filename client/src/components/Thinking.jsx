import React from "react";
import ThinkCard from "./ui/thinkCard";
import '../components/ui/thinkingCard.css';

const Thinking = () => {
  return (
    <div className="min-h-screen py-10 sm:py-16 lg:py-20 w-full bg-gradient-to-r from-slate-50/90 to-white/90 dark:from-gray-800/90 dark:to-gray-900/90 backdrop-blur-lg flex flex-col items-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl text-center mx-auto mb-12">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter bg-gradient-to-r from-emerald-700 via-teal-600 to-cyan-500 bg-clip-text text-transparent">
          Thinking
        </h1>
        <p className="mt-4 text-gray-900 dark:text-gray-300 text-base sm:text-lg md:text-xl">
          Where ideas begin to take shape.
        </p>
      </div>

      <div className="cards-grid">
        <ThinkCard />
       
      </div>
    </div>
  );
};

export default Thinking;
