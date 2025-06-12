"use client";
import React from "react";
import { LayoutGrid } from "../components/ui/layout-grid.jsx";

export default function LayoutGridDemo() {
return (
  <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 p-8 md:p-12 lg:p-16">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16 md:mb-20">
        <div className="relative">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-400 bg-clip-text text-transparent whitespace-nowrap break-keep">
            Work
          </h1>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full" />
        </div>

        <p className="text-lg md:text-xl text-gray-600 mt-8 max-w-2xl mx-auto leading-relaxed">
          Explore our innovative solutions that make a real difference in
          people's lives.
        </p>
      </div>
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-100/20 via-teal-100/20 to-cyan-100/20 rounded-3xl blur-3xl" />
        <LayoutGrid cards={cards} />
      </div>
    </div>
  </div>
);
}

const SkeletonOne = () => {
  return (
    <div className="text-white group-hover:text-white transition-colors duration-300">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
        <p className="font-black text-2xl md:text-3xl lg:text-4xl tracking-tight">
          JennyKiDuniya
        </p>
      </div>
      <p className="text-sm md:text-base lg:text-lg opacity-90 leading-relaxed font-medium">
        A CSR-based storytelling platform that highlights the lives of real unsung heroes,
        JennyKiDuniya inspires with narratives of hope and impact.
      </p>
      <div className="mt-4 flex items-center gap-2 text-xs md:text-sm opacity-75">
        <span className="px-2 py-1 bg-white/20 rounded-full backdrop-blur-sm">CSR</span>
        <span className="px-2 py-1 bg-white/20 rounded-full backdrop-blur-sm">Storytelling</span>
        <span className="px-2 py-1 bg-white/20 rounded-full backdrop-blur-sm">Impact</span>
      </div>
    </div>
  );
};

const SkeletonTwo = () => {
  return (
    <div className="text-white group-hover:text-white transition-colors duration-300">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
        <p className="font-black text-2xl md:text-3xl lg:text-4xl tracking-tight">
          InstaDukan
        </p>
      </div>
      <p className="text-sm md:text-base lg:text-lg opacity-90 leading-relaxed font-medium">
        A zero-to-live eCommerce store builder designed for solo and micro-entrepreneurs
        with drag-and-drop editing, one-click WhatsApp/QR distribution, and AI-powered suggestions.
      </p>
      <div className="mt-4 flex items-center gap-2 text-xs md:text-sm opacity-75">
        <span className="px-2 py-1 bg-white/20 rounded-full backdrop-blur-sm">eCommerce</span>
        <span className="px-2 py-1 bg-white/20 rounded-full backdrop-blur-sm">AI-Powered</span>
        <span className="px-2 py-1 bg-white/20 rounded-full backdrop-blur-sm">No-Code</span>
      </div>
    </div>
  );
};

const SkeletonThree = () => {
  return (
    <div className="text-white group-hover:text-white transition-colors duration-300">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
        <p className="font-black text-2xl md:text-3xl lg:text-4xl tracking-tight">
          Fundora
        </p>
      </div>
      <p className="text-sm md:text-base lg:text-lg opacity-90 leading-relaxed font-medium">
        A smart, AI-assisted fundraiser platform enabling users to launch causes,
        collect donations easily, and connect with real impact communities.
      </p>
      <div className="mt-4 flex items-center gap-2 text-xs md:text-sm opacity-75">
        <span className="px-2 py-1 bg-white/20 rounded-full backdrop-blur-sm">Fundraising</span>
        <span className="px-2 py-1 bg-white/20 rounded-full backdrop-blur-sm">AI-Assisted</span>
        <span className="px-2 py-1 bg-white/20 rounded-full backdrop-blur-sm">Community</span>
      </div>
    </div>
  );
};

const SkeletonFour = () => {
  return (
    <div className="text-white group-hover:text-white transition-colors duration-300">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
        <p className="font-black text-2xl md:text-3xl lg:text-4xl tracking-tight">
          SilentSOS
        </p>
      </div>
      <p className="text-sm md:text-base lg:text-lg opacity-90 leading-relaxed font-medium">
        A discreet emergency app that enables users to send silent alerts with location and details
        in one tap—essential for safety without drawing attention.
      </p>
      <div className="mt-4 flex items-center gap-2 text-xs md:text-sm opacity-75">
        <span className="px-2 py-1 bg-white/20 rounded-full backdrop-blur-sm">Emergency</span>
        <span className="px-2 py-1 bg-white/20 rounded-full backdrop-blur-sm">Safety</span>
        <span className="px-2 py-1 bg-white/20 rounded-full backdrop-blur-sm">Discreet</span>
      </div>
    </div>
  );
};

const cards = [
  {
    id: 1,
    content: <SkeletonOne />,
    className: "col-span-1 group",
    thumbnail: "/images/jennykiduniya.png",
  },
  {
    id: 2,
    content: <SkeletonTwo />,
    className: "col-span-1 group",
    thumbnail: "/images/InstaDukan.png",
  },
  {
    id: 3,
    content: <SkeletonThree />,
    className: "col-span-1 group",
    thumbnail: "/images/Fundora.png",
  },
  {
    id: 4,
    content: <SkeletonFour />,
    className: "col-span-1 group",
    thumbnail: "/images/SilentSOS.png",
  },
];