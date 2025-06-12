import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";

const allBlogPosts = [
  {
    slug: "backend-structure-blog",
    id: 1,
    title: "Cracking the Backend Code",
    excerpt: "A visual guide to APIs, databases, and server logic — backend explained like never before.",
    date: "May 15, 2025",
    dateSort: new Date("2025-05-15"),
    image: "/images/BackendExplain.png",
    category: "Web Development",
  },
  {
    slug: "frontend-is-dead",
    id: 2,
    title: "Frontend is Dead? Not So Fast.",
    excerpt: "A bold take on why frontend dev is evolving — not dying. Learn what's next.",
    date: "May 20, 2025",
    dateSort: new Date("2025-05-20"),
    image: "/images/ID1.jpeg",
    category: "Tech Opinion",
  },
  {
    slug: "your-first-ai-app",
    id: 3,
    title: "Your First AI App in a Weekend",
    excerpt: "Use modern AI APIs to build a smart product fast — no PhD required.",
    date: "May 30, 2025",
    dateSort: new Date("2025-05-30"),
    image: "/images/ID2.jpeg",
    category: "AI/ML",
  },
];

const Blog = () => {
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const sortedPosts = allBlogPosts.sort((a, b) => b.dateSort - a.dateSort);
  const displayedPosts = showAll ? sortedPosts : sortedPosts.slice(0, 3);

  return (
    <section
      ref={containerRef}
      className="relative py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-30"></div>

      <motion.div style={{ y }} className="max-w-7xl mx-auto relative">
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block px-3 py-1 text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/50 rounded-full mb-3 sm:mb-4">
            Insights & Updates
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-400 dark:from-emerald-400 dark:via-teal-300 dark:to-cyan-300 bg-clip-text text-transparent">
            {showAll ? "All Articles" : "My Recent Blog"}
          </h2>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl md:max-w-3xl mx-auto">
            {showAll
              ? "Explore our complete collection of expert articles and tutorials."
              : "Discover our latest expert articles, tutorials, and industry insights."}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayedPosts.map((post, index) => (
            <a
              href="https://github.com/arpitshukla9/PortfolioReadme/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BlogCard key={post.id} post={post} index={index} />
            </a>
          ))}
        </div>

        <div className="mt-12 md:mt-16 text-center space-y-4 sm:space-y-0 sm:space-x-4">
          {!showAll && (
            <button
              onClick={() => setShowAll(true)}
              className="inline-block px-6 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-400 dark:from-emerald-500 dark:via-teal-400 dark:to-cyan-300 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              View More Articles
            </button>
          )}

          <button
            onClick={() => navigate("/blog")}
            className="inline-block px-6 sm:px-8 py-2 sm:py-3 bg-white dark:bg-gray-800 text-emerald-600 dark:text-teal-300 border-2 border-teal-600 dark:border-teal-400 font-medium rounded-full shadow-lg hover:shadow-xl hover:bg-indigo-50 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-105"
          >
            Go to Blog Page
          </button>
        </div>

        {showAll && (
          <div className="mt-6 md:mt-8 text-center">
            <button
              onClick={() => setShowAll(false)}
              className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium transition-colors duration-300"
            >
              Show Less
            </button>
          </div>
        )}
      </motion.div>
    </section>
  );
};

const BlogCard = ({ post, index, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative h-full cursor-pointer"
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-gray-800 dark:to-gray-700 rounded-xl sm:rounded-2xl transform group-hover:-rotate-1 group-hover:scale-105 transition-all duration-300"></div>
      <div className="relative h-full bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl overflow-hidden shadow-md dark:shadow-gray-900/20 sm:shadow-lg dark:sm:shadow-gray-900/30 transition-all duration-300 group-hover:shadow-xl">
        <div className="h-48 sm:h-56 overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="p-4 sm:p-6">
          <div className="flex justify-between items-center mb-2 sm:mb-3">
            <span className="text-xs font-semibold px-2 py-1 bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300 rounded-full">
              {post.category}
            </span>
            <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{post.date}</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
            {post.title}
          </h3>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-3 sm:mb-4">{post.excerpt}</p>
          <div className="flex items-center text-sm sm:text-base text-indigo-600 dark:text-indigo-400 font-medium group-hover:text-indigo-800 dark:group-hover:text-indigo-300 transition-colors duration-300">
            <span>Read article</span>
            <svg
              className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Blog;
