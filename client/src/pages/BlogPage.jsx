import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const allBlogPosts = [
  {
    slug: "backend-structure-blog",
    id: 1,
    title: "Cracking the Backend Code",
    excerpt:
      "A visual guide to APIs, databases, and server logic — backend explained like never before.",
    date: "May 15, 2025",
    dateSort: new Date("2025-05-15"),
    image: "/images/BackendExplain.png",
    category: "Web Development",
  },
  {
    slug: "frontend-is-dead",
    id: 2,
    title: "Frontend is Dead? Not So Fast.",
    excerpt:
      "A bold take on why frontend dev is evolving — not dying. Learn what's next.",
    date: "May 20, 2025",
    dateSort: new Date("2025-05-20"),
    image: "/images/ID1.jpeg",
    category: "Tech Opinion",
  },
  {
    slug: "your-first-ai-app",
    id: 3,
    title: "Your First AI App in a Weekend",
    excerpt:
      "Use modern AI APIs to build a smart product fast — no PhD required.",
    date: "May 30, 2025",
    dateSort: new Date("2025-05-30"),
    image: "/images/ID2.jpeg",
    category: "AI/ML",
  },
];

const BlogPage = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const sortedPosts = allBlogPosts.sort((a, b) => b.dateSort - a.dateSort);

  return (
    <div className="min-h-screen bg-skin-gradient text-skin-text transition-colors duration-300 p-8 md:p-12 lg:p-16 ">
      <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-[var(--color-accent-glow)] rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-30"></div>

      <motion.div style={{ y }} className="max-w-7xl mx-auto relative">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="p-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent-glow)] to-[var(--color-accent)] bg-clip-text text-transparent">
            All Articles
          </h2>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl text-[var(--color-text)] max-w-2xl md:max-w-3xl mx-auto">
            Explore our complete collection of expert articles and tutorials.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {sortedPosts.map((post, index) => (
            <a
              key={post.id}
              href="https://github.com/arpitshukla9/PortfolioReadme/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BlogCard post={post} index={index} />
            </a>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

const BlogCard = ({ post, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative h-full cursor-pointer"
    >
      <div className="absolute inset-0 bg-[var(--color-gradient)] rounded-xl sm:rounded-2xl transform group-hover:-rotate-1 group-hover:scale-105 transition-all duration-300"></div>
      <div className="relative h-full bg-[var(--color-card)] backdrop-blur-[var(--glass-blur)] border border-[var(--color-border)] rounded-xl sm:rounded-2xl overflow-hidden shadow-[var(--shadow-glass)] transition-all duration-300">
        <div className="h-48 sm:h-56 overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="p-4 sm:p-6">
          <div className="flex justify-between items-center mb-2 sm:mb-3">
            <span className="text-xs font-semibold px-2 py-1 bg-[var(--color-muted)] text-[var(--color-accent)] rounded-full">
              {post.category}
            </span>
            <span className="text-xs sm:text-sm text-[var(--color-text)] opacity-70">
              {post.date}
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-[var(--color-heading)] mb-1 sm:mb-2 group-hover:text-[var(--color-accent)] transition-colors duration-300">
            {post.title}
          </h3>
          <p className="text-sm sm:text-base text-[var(--color-text)] opacity-80 mb-3 sm:mb-4">
            {post.excerpt}
          </p>
          <div className="flex items-center text-sm sm:text-base text-[var(--color-accent)] font-medium group-hover:brightness-110 transition-colors duration-300">
            <span>Read article</span>
            <svg
              className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogPage;
