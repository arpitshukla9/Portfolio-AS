import React from "react";
import {
  Linkedin,
  Github,
  Instagram,
  Sparkles,
  Code2,
  Palette,
} from "lucide-react";
import CardDemo from "../components/ui/cards-demo-1.jsx";

function Body() {
  return (
    <div className="min-h-screen bg-skin-gradient text-skin-text transition-colors duration-300 px-4 py-8 sm:px-6 sm:py-10 md:px-8 md:py-12 lg:px-12 lg:py-16 ">
      <div className="max-w-7xl mx-auto mt-8 sm:mt-10 md:mt-12">
        {/* Social Links */}
        <div className="flex justify-center lg:justify-start mb-8 sm:mb-10 md:mb-12">
          <div className="flex space-x-4 sm:space-x-5 md:space-x-6">
            {[
              {
                href: "https://www.linkedin.com/in/9arpitshukla",
                icon: Linkedin,
                color: "text-blue-600 group-hover:text-blue-700",
              },
              {
                href: "https://instagram.com/thetaaverse",
                icon: Instagram,
                color: "text-pink-500 group-hover:text-pink-600",
              },
              {
                href: "https://github.com/arpitshukla9",
                icon: Github,
                color: "text-skin-text group-hover:text-skin-heading",
              },
            ].map(({ href, icon: Icon, color }, index) => (
              <a
                key={index}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-2 sm:p-2.5 md:p-3 rounded-lg sm:rounded-xl bg-glass shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 sm:hover:scale-110"
              >
                <Icon size={20} className={`${color} w-5 h-5 sm:w-6 sm:h-6`} />
              </a>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <main className="flex flex-col lg:flex-row gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="lg:w-1/2 space-y-6 sm:space-y-8 md:space-y-10 text-center lg:text-left">
            <div className="space-y-4 sm:space-y-5 md:space-y-6">
              <div className="flex items-center justify-center lg:justify-start gap-2 sm:gap-3 mb-2 sm:mb-3 md:mb-4">
                <Sparkles
                  className="text-skin-accent animate-pulse"
                  size={20}
                />
                <span className="text-xs sm:text-sm font-semibold text-skin-accent tracking-wider uppercase">
                  Portfolio
                </span>
              </div>

              <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
                <span className="bg-gradient-to-r from-skin-heading to-skin-text bg-clip-text text-transparent">
                  Hello, I'm
                </span>
                <br />
                <span className="bg-gradient-to-r from-skin-accent via-skin-glow to-cyan-500 bg-clip-text text-transparent animate-gradient">
                  Arpit Shukla
                </span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0 text-skin-text">
                A passionate full-stack developer in my learning and building
                phase. I specialize in real-time applications, modern UI/UX, and
                scalable microservice architectures. Currently exploring AI
                integrations, system design principles, and performance-first
                development.
              </p>

              <div className="flex flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start">
                <div className="flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-2 bg-skin-muted rounded-lg shadow-sm">
                  <Code2 size={14} className="text-skin-accent" />
                  <span className="text-xs sm:text-sm font-medium text-skin-heading">
                    Developer
                  </span>
                </div>
                <div className="flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-2 bg-skin-muted rounded-lg shadow-sm">
                  <Palette size={14} className="text-purple-500" />
                  <span className="text-xs sm:text-sm font-medium text-skin-heading">
                    Designer
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Component - CardDemo */}
          <div className="lg:w-1/2 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
            <CardDemo />
          </div>
        </main>

        {/* Stats Section */}
        <div className="mt-12 sm:mt-16 md:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {[
            {
              value: "10+",
              label: "Projects Completed",
              color: "text-skin-accent",
            },
            {
              value: "1.5+",
              label: "Years Experience",
              color: "text-purple-500",
            },
            {
              value: "100%",
              label: "Client Satisfaction",
              color: "text-cyan-500",
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="p-4 sm:p-5 md:p-6 bg-glass rounded-xl sm:rounded-2xl border border-skin-border text-center shadow-[var(--shadow-glass)]"
            >
              <div
                className={`text-2xl sm:text-3xl font-bold mb-1 sm:mb-2 ${stat.color}`}
              >
                {stat.value}
              </div>
              <div className="text-sm sm:text-base text-skin-text">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Body;
