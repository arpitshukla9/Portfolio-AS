import React from 'react';
import {
  Linkedin,
  Github,
  Instagram,
  Sparkles,
  Code2,
  Palette,
} from 'lucide-react';
import CardDemo from '../components/ui/cards-demo-1.jsx';
import SurpriseQuote from './ui/surprise-qoute.jsx';

function Body() {
  return (
   <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 p-8 md:p-12 lg:p-16">
      <div className="max-w-7xl mx-auto mt-12">
        {/* Social Links */}
        <div className="flex justify-center lg:justify-start mb-12">
          <div className="flex space-x-6">
            <a
              href="https://www.linkedin.com/in/9arpitshukla"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-3 rounded-xl bg-white/70 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
              aria-label="LinkedIn"
            >
              <Linkedin size={24} className="text-blue-600 group-hover:text-blue-700" />
            </a>
            <a
              href="https://instagram.com/thetaaverse"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-3 rounded-xl bg-white/70 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
              aria-label="Instagram"
            >
              <Instagram size={24} className="text-pink-500 group-hover:text-pink-600" />
            </a>
            <a
              href="https://github.com/arpitshukla9"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-3 rounded-xl bg-white/70 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
              aria-label="GitHub"
            >
              <Github size={24} className="text-slate-700 group-hover:text-slate-900" />
            </a>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Left Content */}
          <div className="lg:w-1/2 space-y-10 text-center lg:text-left">
            <div className="space-y-6">
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                <Sparkles className="text-indigo-500 animate-pulse" size={28} />
                <span className="text-sm font-semibold text-indigo-600 tracking-wider uppercase">
                  Portfolio
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl font-extrabold">
                <span className="bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  Hello, I'm
                </span>
                <br />
                <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent bg-clip-text text-transparent animate-gradient">
                  Arpit Shukla
                </span>
              </h1>

              <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                A passionate full-stack developer in my learning and building phase.
                I specialize in real-time applications, modern UI/UX, and scalable
                microservice architectures. Currently exploring AI integrations,
                system design principles, and performance-first development. I build
                with intention, learn by doing, and turn ambitious ideas into
                high-impact products.
              </p>

              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full shadow-md">
                  <Code2 size={16} className="text-indigo-500" />
                  <span className="text-sm font-medium text-slate-700">Developer</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full shadow-md">
                  <Palette size={16} className="text-purple-500" />
                  <span className="text-sm font-medium text-slate-700">Designer</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Component - CardDemo */}
          <div className="lg:w-1/2 w-full max-w-lg">
            <CardDemo />
          </div>
        </main>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 bg-white/40 backdrop-blur-sm rounded-2xl border border-white/30 text-center shadow">
            <div className="text-3xl font-bold text-indigo-600 mb-2">10+</div>
            <div className="text-slate-600">Projects Completed</div>
          </div>
          <div className="p-6 bg-white/40 backdrop-blur-sm rounded-2xl border border-white/30 text-center shadow">
            <div className="text-3xl font-bold text-purple-600 mb-2">1.5+</div>
            <div className="text-slate-600">Years Experience</div>
          </div>
          <div className="p-6 bg-white/40 backdrop-blur-sm rounded-2xl border border-white/30 text-center shadow">
            <div className="text-3xl font-bold text-cyan-600 mb-2">100%</div>
            <div className="text-slate-600">Client Satisfaction</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Body;
