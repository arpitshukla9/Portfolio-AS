"use client";
import { cn } from "@/lib/utils";

export default function CardDemo() {
  return (
    <div className="max-w-lg w-full ">
      <div
        className={cn(
          "relative w-full h-[32rem] mt-0 max-w-2xl mx-auto cursor-pointer overflow-hidden rounded-xl shadow-xl border border-neutral-300 dark:border-neutral-800 group transition-all duration-500"
        )}
      >
        {/* Static Image */}
        <img
          src="/arpit.webp"
          alt="Profile"
          className="absolute inset-0 w-full h-full  object-cover object-center transition-opacity duration-500 group-hover:opacity-0"
        />

        {/* Hover Image (GIF or other) */}
        <video
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover object-center opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          src="/cardvideo.mp4"
          alt="Hover"
          type="video/mp4"
          playsInline
          preload="metadata"
          poster="/arpit.webp"
        />

        {/* Text overlay - only appears on hover */}
        <div className="absolute inset-0 bg-black/60 flex flex-col justify-end p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
          <h1 className="font-bold handwritten text-3xl">Arpit Shukla</h1>
          <p className="text-sm font-mono">
            Let’s build something meaningful — intuitive products, impactful
            systems, and bold digital experiences.” I’m Arpit Shukla, a tech
            creator passionate about solving real problems with code, design,
            and systems — from web apps to tools, automations, and beyond.
          </p>
        </div>
      </div>
    </div>
  );
}
