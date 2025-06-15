import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FiArrowRight, FiCalendar, FiBookmark } from "react-icons/fi";

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
    readingTime: "5 min"
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
    readingTime: "4 min"
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
    readingTime: "7 min"
  },
  {
    slug: "responsive-design-2025",
    id: 4,
    title: "Responsive Design in 2025",
    excerpt: "New techniques for creating fluid layouts in the modern web landscape.",
    date: "June 5, 2025",
    dateSort: new Date("2025-06-05"),
    image: "/images/ID3.jpeg",
    category: "UI/UX",
    readingTime: "6 min"
  },
  {
    slug: "web-performance",
    id: 5,
    title: "Web Performance Mastery",
    excerpt: "Advanced techniques to make your websites blazing fast.",
    date: "June 12, 2025",
    dateSort: new Date("2025-06-12"),
    image: "/images/ID4.jpeg",
    category: "Web Development",
    readingTime: "8 min"
  },
  {
    slug: "javascript-2025",
    id: 6,
    title: "JavaScript in 2025",
    excerpt: "What's new and exciting in the world of JavaScript this year.",
    date: "June 18, 2025",
    dateSort: new Date("2025-06-18"),
    image: "/images/ID5.jpeg",
    category: "Programming",
    readingTime: "5 min"
  }
];

const BlogCard = ({ post, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        type: "spring",
        damping: 12,
        stiffness: 100
      }}
      className="group relative h-full cursor-pointer w-full"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 dark:from-blue-600/20 dark:via-purple-600/20 dark:to-pink-600/20 rounded-xl lg:rounded-2xl transform group-hover:-rotate-1 group-hover:scale-[1.02] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"></div>
      
      <div className="relative h-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/70 dark:border-gray-700/50 rounded-xl lg:rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500 group-hover:shadow-blue-500/10 dark:group-hover:shadow-blue-400/10">
        <div className="aspect-w-16 aspect-h-9 w-full overflow-hidden">
          <motion.img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            initial={{ opacity: 0.9 }}
            whileHover={{ opacity: 1 }}
          />
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center text-xs font-semibold px-3 py-1 bg-white/90 dark:bg-gray-800/90 text-blue-600 dark:text-blue-400 rounded-full backdrop-blur-sm shadow-xs">
              <FiBookmark className="mr-1.5" size={12} />
              {post.category}
            </span>
          </div>
        </div>

        <div className="p-4 sm:p-5 lg:p-6">
          <div className="flex justify-between items-center mb-3 sm:mb-4">
            <span className="inline-flex items-center text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              <FiCalendar className="mr-1.5" size={14} />
              {post.date}
            </span>
            <span className="text-xs sm:text-sm text-gray-400 dark:text-gray-500">
              {post.readingTime} read
            </span>
          </div>

          <motion.h3 
            className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300"
            whileHover={{ x: 2 }}
          >
            {post.title}
          </motion.h3>

          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 opacity-90 mb-4 sm:mb-5 line-clamp-2">
            {post.excerpt}
          </p>

          <motion.div 
            className="inline-flex items-center text-sm sm:text-base text-blue-600 dark:text-blue-400 font-medium group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300"
            whileHover={{ x: 4 }}
          >
            <span>Read article</span>
            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut"
              }}
              className="ml-2"
            >
              <FiArrowRight />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

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
      className="min-h-screen bg-skin-gradient text-skin-text transition-colors duration-300 px-4 py-8 sm:px-6 sm:py-10 md:px-8 md:py-12 lg:px-12 lg:py-16 ">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-30"></div>
      <div className="absolute bottom-10 left-10 w-16 h-16 md:w-24 md:h-24 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-30"></div>

      <motion.div 
        style={{ y }} 
        className="max-w-7xl mx-auto relative z-10"
      >
        {/* Header section */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
            {showAll ? "All Articles" : "Recent Articles"}
          </h2>
          <p className="mt-4 sm:mt-5 md:mt-6 text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl md:max-w-3xl mx-auto">
            {showAll
              ? "Explore our complete collection of expert articles and tutorials."
              : "Discover our latest expert articles, tutorials, and industry insights."}
          </p>
        </div>

        {/* Blog posts grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
          {displayedPosts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>

        {/* Buttons section */}
        <div className="mt-12 md:mt-16 lg:mt-20 text-center flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
          {!showAll && (
            <motion.button
              onClick={() => setShowAll(true)}
              className="px-6 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Articles
            </motion.button>
          )}

          <motion.button
            onClick={() => navigate("/blog")}
            className="px-6 sm:px-8 py-2 sm:py-3 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 border-2 border-blue-600 dark:border-blue-400 font-medium rounded-lg shadow-lg hover:shadow-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Blog Archive
          </motion.button>

          {showAll && (
            <motion.button
              onClick={() => setShowAll(false)}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors duration-300 mt-4 sm:mt-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Show Less
            </motion.button>
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default Blog;