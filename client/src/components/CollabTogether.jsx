"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Rocket,
  Code,
  Lightbulb,
  GraduationCap,
  Mail,
  Check,
  Loader2,
} from "lucide-react";

const CollabForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "project",
    message: "",
    github: "",
  });
  const [status, setStatus] = useState("idle");
  const [errors, setErrors] = useState({});

  const collaborationTypes = [
    {
      value: "project",
      label: "College Project",
      icon: <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5" />,
    },
    {
      value: "startup",
      label: "Startup Idea",
      icon: <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5" />,
    },
    {
      value: "hackathon",
      label: "Hackathon",
      icon: <Code className="w-4 h-4 sm:w-5 sm:h-5" />,
    },
    { value: "other", label: "Other", icon: <Mail className="w-4 h-4 sm:w-5 sm:h-5" /> },
  ];

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name required";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      newErrors.email = "Valid email required";
    if (!formData.message.trim()) newErrors.message = "Message required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");

    try {
      const response = await fetch(
        "https://portfolio-as.onrender.com/api/collaborate",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) throw new Error("Submission failed");
      setStatus("success");
      setFormData({
        name: "",
        email: "",
        type: "project",
        message: "",
        github: "",
      });
    } catch (error) {
      console.error(error);
      setStatus("error");
    } finally {
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  return (
  <div className="min-h-screen bg-skin-gradient text-skin-text transition-colors duration-300 px-4 py-8 sm:p-8 md:p-12 lg:p-16">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8 sm:mb-12">
        <motion.h2 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent-glow)] to-[var(--color-accent)] bg-clip-text text-transparent"
        >
          Let's Collaborate
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-2 sm:mt-4 text-gray-900 dark:text-gray-300 text-base sm:text-lg md:text-xl"
        >
          Together we can create something extraordinary
        </motion.p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center bg-skin-card text-skin-text rounded-3xl shadow-[var(--shadow-glass)] p-6 sm:p-8 md:p-10 border border-skin-border backdrop-blur-[var(--glass-blur)]">
        {/* Video Section - Hidden on small screens */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden md:block relative rounded-2xl overflow-hidden border-2 border-[var(--color-border)] shadow-[0_8px_32px_rgba(31,38,135,0.15)]"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-auto rounded-xl"
            poster="/images/collab-poster.jpg"
          >
            <source src="/videos/robot-gif.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-card)] via-transparent to-transparent pointer-events-none" />
        </motion.div>

        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-[var(--color-card)] p-5 sm:p-6 md:p-8 rounded-2xl border border-[var(--color-border)] shadow-sm"
        >
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-2 rounded-lg bg-[var(--color-accent)]/10"
            >
              <Rocket className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--color-accent)]" />
            </motion.div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-heading)]">
                Collaboration Request
              </h2>
              <p className="text-sm sm:text-base text-[var(--color-muted)]">
                Tell us about your project
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <div>
              <label className="block text-sm sm:text-base font-medium text-[var(--color-text)] mb-2">
                Project Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                {collaborationTypes.map((type) => (
                  <motion.button
                    key={type.value}
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, type: type.value }))
                    }
                    className={`flex items-center justify-center gap-1 sm:gap-2 p-2 sm:p-2.5 rounded-lg border text-xs sm:text-sm transition-all ${
                      formData.type === type.value
                        ? "bg-[var(--color-accent)]/10 border-[var(--color-accent)] text-[var(--color-accent)]"
                        : "bg-[var(--color-base)] border-[var(--color-border)] hover:bg-[var(--color-base-hover)] text-[var(--color-text)]"
                    }`}
                  >
                    {type.icon}
                    {type.label}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm sm:text-base font-medium text-[var(--color-text)] mb-1"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg outline-none transition-all duration-200
                  bg-skin-base text-skin-text border text-sm sm:text-base
                  ${
                    errors.name
                      ? "border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-400/30"
                      : "border-skin-border focus:border-skin-accent focus:ring-2 focus:ring-skin-accent/30"
                  }`}
                  placeholder="Your name"
                />
                <AnimatePresence>
                  {errors.name && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-1 text-xs sm:text-sm text-red-500"
                    >
                      {errors.name}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm sm:text-base font-medium text-[var(--color-text)] mb-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg outline-none transition-all duration-200
                  bg-skin-base text-skin-text border text-sm sm:text-base
                  ${
                    errors.email
                      ? "border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-400/30"
                      : "border-skin-border focus:border-skin-accent focus:ring-2 focus:ring-skin-accent/30"
                  }`}
                  placeholder="your@email.com"
                />

                <AnimatePresence>
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-1 text-xs sm:text-sm text-red-500"
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {formData.type === "project" && (
              <div>
                <label
                  htmlFor="github"
                  className="block text-sm sm:text-base font-medium text-[var(--color-text)] mb-1"
                >
                  GitHub Repository (optional)
                </label>
                <input
                  id="github"
                  name="github"
                  type="url"
                  value={formData.github}
                  onChange={handleChange}
                  className="w-full px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg bg-[var(--color-base)] text-[var(--color-text)] border border-[var(--color-border)] focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/30 outline-none text-sm sm:text-base"
                  placeholder="https://github.com/your/repo"
                />
              </div>
            )}

            <div>
              <label
                htmlFor="message"
                className="block text-sm sm:text-base font-medium text-[var(--color-text)] mb-1"
              >
                {formData.type === "project"
                  ? "Project Details"
                  : formData.type === "startup"
                  ? "Startup Description"
                  : formData.type === "hackathon"
                  ? "Hackathon Info"
                  : "Your Message"}
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                className={`w-full px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg bg-[var(--color-base)] text-[var(--color-text)] placeholder:text-[var(--color-muted)] outline-none transition-all text-sm sm:text-base ${
                  errors.message
                    ? "border border-red-400"
                    : "border border-[var(--color-border)] focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/30"
                }`}
                placeholder={
                  formData.type === "project"
                    ? "Describe your project goals, technologies, and timeline..."
                    : formData.type === "startup"
                    ? "Tell us about your startup idea and what you need help with..."
                    : formData.type === "hackathon"
                    ? "Which hackathon? What's your team looking for?"
                    : "How can we collaborate?"
                }
              ></textarea>
              <AnimatePresence>
                {errors.message && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-1 text-xs sm:text-sm text-red-500"
                  >
                    {errors.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <div className="pt-2">
              <motion.button
                type="submit"
                disabled={status === "submitting"}
                whileHover={status !== "submitting" ? { scale: 1.02 } : {}}
                whileTap={status !== "submitting" ? { scale: 0.98 } : {}}
                className={`w-full py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg font-medium flex items-center justify-center gap-2 transition-all text-sm sm:text-base ${
                  status === "submitting"
                    ? "bg-[var(--color-muted)] cursor-not-allowed"
                    : status === "success"
                    ? "bg-green-500 text-white"
                    : "bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-dark)] shadow-lg"
                }`}
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : status === "success" ? (
                  <>
                    <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Submitted!</span>
                  </>
                ) : (
                  <>
                    <Rocket className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Send Request</span>
                  </>
                )}
              </motion.button>

              <AnimatePresence>
                {status === "error" && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-2 text-center text-xs sm:text-sm text-red-500"
                  >
                    Submission failed. Please try again or email us directly.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  </div>
);
};

export default CollabForm;