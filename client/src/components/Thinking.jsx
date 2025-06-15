import React from "react";
import ThinkCard from "./ui/thinkCard";

const Thinking = () => {
  return (
       <div className="min-h-screen bg-skin-gradient text-skin-text transition-colors duration-300 p-8 md:p-12 lg:p-16">
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute w-[500px] h-[500px] bg-[rgba(0,200,255,0.1)] rounded-full top-[-100px] left-[-100px] blur-[150px]" />
        <div className="absolute w-[400px] h-[400px] bg-[rgba(0,249,203,0.1)] rounded-full bottom-[-80px] right-[-80px] blur-[120px]" />
      </div>

      <div className="max-w-5xl text-center mx-auto mb-14">
        <h2 className="text-4xl sm:text-5xl p-4 lg:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent-glow)] to-[var(--color-accent)] bg-clip-text text-transparent">
          Thinking
        </h2>
      <p className="mt-3 sm:mt-4 max-w-xl mx-auto text-lg sm:text-xl text-[var(--color-text)]">
          Where ideas begin to take shape — and transform into products.
        </p>
      </div>
      <div className="w-full max-w-7xl px-2 sm:px-4 lg:px-8">
        <ThinkCard />
      </div>
    </div>
  );
};

export default Thinking;
