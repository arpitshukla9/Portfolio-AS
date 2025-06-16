import React, { useState } from "react";
import {
  Mail,
  Phone,
  User,
  MessageCircle,
  Send,
  RefreshCw,
  CheckCircle,
  XCircle,
  Github,
  Linkedin,
  Instagram,
  MapPin,
} from "lucide-react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    services: [],
    budget: "",
    message: "",
    urgent: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [showToast, setShowToast] = useState(false);

  const serviceOptions = [
    "Web Dev",
    "Mobile Apps",
    "UI/UX",
    "E-commerce",
    "Marketing",
    "SEO",
    "Cloud",
    "Consulting",
  ];

const budgetOptions = [
  "Under $300 / ₹25,000",
  "$300 – $600 / ₹25,000 – ₹50,000",
  "$600 – $900 / ₹50,000 – ₹75,000",
  "$900+ / ₹75,000+",
  "Open to Discussion / Not Sure",
];


  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ""));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      newErrors.fullName = "Full name is required (min 2 characters)";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (formData.services.length === 0) {
      newErrors.services = "Please select at least one service";
    }

    if (!formData.message.trim() || formData.message.trim().length < 20) {
      newErrors.message = "Message is required (min 20 characters)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleServiceChange = (service) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));

    if (errors.services) {
      setErrors((prev) => ({
        ...prev,
        services: "",
      }));
    }
  };

  const submitToBackend = async (data) => {
    const response = await fetch(
      "https://portfolio-as.onrender.com/api/contact",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...data,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          referrer: document.referrer,
          source: "website_contact_form",
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP ${response.status}: ${response.statusText}`
      );
    }

    return await response.json();
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      const firstErrorField = Object.keys(errors)[0];
      const element = document.getElementById(firstErrorField);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        element.focus();
      }
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const result = await submitToBackend(formData);

      setSubmitStatus("success");
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        company: "",
        services: [],
        budget: "",
        message: "",
        urgent: false,
      });
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 6000);
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      company: "",
      services: [],
      budget: "",
      message: "",
      urgent: false,
    });
    setErrors({});
    setSubmitStatus(null);
  };

  return (
    <div className="min-h-screen bg-skin-gradient text-skin-text transition-colors duration-300 p-8 md:p-12 lg:p-16 ">
      <div className="p-4 sm:p-6">
        <h2 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent-glow)] to-[var(--color-accent)] bg-clip-text text-transparent">
          Contact Us
        </h2>

        <p className="mt-3 sm:mt-4 max-w-2xl mx-auto text-center text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300">
          We'd love to hear from you! Whether you have a question, feedback, or
          just want to say hello—drop us a message and we'll get back to you as
          soon as possible.
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        {showToast && (
          <div
            className={`fixed top-4 right-4 z-50 p-3 sm:p-4 rounded-lg sm:rounded-xl shadow-lg transform transition-all duration-500 max-w-xs sm:max-w-sm ${
              showToast
                ? "translate-x-0 opacity-100 scale-100"
                : "translate-x-full opacity-0 scale-95"
            } ${
              submitStatus === "success"
                ? "bg-indigo-600 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            <div className="flex items-start space-x-2 sm:space-x-3">
              {submitStatus === "success" ? (
                <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0 mt-0.5" />
              ) : (
                <XCircle className="h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0 mt-0.5" />
              )}
              <div>
                <h4 className="font-semibold text-xs sm:text-sm">
                  {submitStatus === "success"
                    ? "Message Sent!"
                    : "Submission Failed"}
                </h4>
                <p className="text-xs sm:text-sm opacity-90 mt-1">
                  {submitStatus === "success"
                    ? "We'll get back to you within 24 hours."
                    : "Please try again or contact us directly."}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="lg:grid lg:grid-cols-12 lg:gap-8 xl:gap-12">
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="text-center lg:text-left mb-8 sm:mb-10 lg:mb-0">
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent-glow)] to-[var(--color-accent)] bg-clip-text text-transparent">
                Let's Build Something Amazing
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto lg:mx-0 mb-6 sm:mb-8">
                Transform your ideas into reality. Our expert team is ready to
                help you create exceptional digital experiences.
              </p>

              <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8 max-w-md mx-auto">
                <div className="flex items-center justify-start space-x-3 sm:space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-indigo-600 rounded-full flex items-center justify-center">
                    <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium">
                      Email Us
                    </p>
                    <a
                      href="mailto:arpit.shukla.work.gmail.com"
                      className="text-sm sm:text-base text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-semibold"
                    >
                      contact@example.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center justify-start space-x-3 sm:space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-indigo-600 rounded-full flex items-center justify-center">
                    <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium">
                      Call Us
                    </p>
                    <a
                      href="tel:+9058635750"
                      className="text-sm sm:text-base text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-semibold"
                    >
                      Just Call Us
                    </a>
                  </div>
                </div>

                <div className="flex items-center justify-start space-x-3 sm:space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-indigo-600 rounded-full flex items-center justify-center">
                    <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium">
                      Visit Us
                    </p>
                    <p className="text-sm sm:text-base text-gray-900 dark:text-white font-semibold">
                      Mathura, India
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center lg:justify-start mb-8 sm:mb-10">
                <div className="flex space-x-4 sm:space-x-6">
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
                      className="group p-2 sm:p-3 rounded-lg sm:rounded-xl bg-glass shadow hover:shadow-md transition-all duration-300 hover:scale-110"
                    >
                      <Icon size={20} className={color} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 xl:col-span-8">
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl border border-white/50 dark:border-gray-700/50 p-4 sm:p-6 md:p-8 lg:p-10">
              <div className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="group">
                    <label
                      htmlFor="fullName"
                      className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1 sm:mb-2"
                    >
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5 group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400 transition-colors duration-300" />
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className={`w-full pl-9 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3.5 bg-gray-50/80 dark:bg-gray-700/80 border-2 rounded-lg sm:rounded-xl text-sm sm:text-base text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none transition-all duration-300 ${
                          errors.fullName
                            ? "border-red-400 focus:border-red-500 bg-red-50/50 dark:bg-red-900/20"
                            : "border-gray-200 dark:border-gray-600 focus:border-indigo-500 hover:border-gray-300 dark:hover:border-gray-500 focus:bg-white dark:focus:bg-gray-700"
                        }`}
                        placeholder="Arpit Shukla"
                      />
                    </div>
                    {errors.fullName && (
                      <p className="mt-1 text-xs sm:text-sm text-red-500 dark:text-red-400 animate-pulse">
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div className="group">
                    <label
                      htmlFor="email"
                      className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1 sm:mb-2"
                    >
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5 group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400 transition-colors duration-300" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full pl-9 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3.5 bg-gray-50/80 dark:bg-gray-700/80 border-2 rounded-lg sm:rounded-xl text-sm sm:text-base text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none transition-all duration-300 ${
                          errors.email
                            ? "border-red-400 focus:border-red-500 bg-red-50/50 dark:bg-red-900/20"
                            : "border-gray-200 dark:border-gray-600 focus:border-indigo-500 hover:border-gray-300 dark:hover:border-gray-500 focus:bg-white dark:focus:bg-gray-700"
                        }`}
                        placeholder="arpit@example.com"
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-xs sm:text-sm text-red-500 dark:text-red-400 animate-pulse">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="group">
                    <label
                      htmlFor="phone"
                      className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1 sm:mb-2"
                    >
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5 group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400 transition-colors duration-300" />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full pl-9 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3.5 bg-gray-50/80 dark:bg-gray-700/80 border-2 rounded-lg sm:rounded-xl text-sm sm:text-base text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none transition-all duration-300 ${
                          errors.phone
                            ? "border-red-400 focus:border-red-500 bg-red-50/50 dark:bg-red-900/20"
                            : "border-gray-200 dark:border-gray-600 focus:border-indigo-500 hover:border-gray-300 dark:hover:border-gray-500 focus:bg-white dark:focus:bg-gray-700"
                        }`}
                        placeholder="+91 XXXXXXXXXX"
                      />
                    </div>
                    {errors.phone && (
                      <p className="mt-1 text-xs sm:text-sm text-red-500 dark:text-red-400 animate-pulse">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div className="group">
                    <label
                      htmlFor="company"
                      className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1 sm:mb-2"
                    >
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3.5 bg-gray-50/80 dark:bg-gray-700/80 border-2 border-gray-200 dark:border-gray-600 rounded-lg sm:rounded-xl text-sm sm:text-base text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-indigo-500 hover:border-gray-300 dark:hover:border-gray-500 focus:bg-white dark:focus:bg-gray-700 transition-all duration-300"
                      placeholder="Your Company"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 sm:mb-4">
                    Services Needed *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
                    {serviceOptions.map((service) => (
                      <label
                        key={service}
                        className={`relative flex items-center justify-center p-2 sm:p-3 rounded-lg sm:rounded-xl border-2 cursor-pointer transition-all duration-300 hover:scale-105 ${
                          formData.services.includes(service)
                            ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-200 shadow-md"
                            : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                        }`}
                      >
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={formData.services.includes(service)}
                          onChange={() => handleServiceChange(service)}
                        />
                        <span className="text-xs sm:text-sm font-medium text-center">
                          {service}
                        </span>
                      </label>
                    ))}
                  </div>
                  {errors.services && (
                    <p className="mt-1 text-xs sm:text-sm text-red-500 dark:text-red-400 animate-pulse">
                      {errors.services}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label
                      htmlFor="budget"
                      className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1 sm:mb-2"
                    >
                      Project Budget
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3.5 bg-gray-50/80 dark:bg-gray-700/80 border-2 border-gray-200 dark:border-gray-600 rounded-lg sm:rounded-xl text-sm sm:text-base text-gray-900 dark:text-white focus:outline-none focus:border-indigo-500 hover:border-gray-300 dark:hover:border-gray-500 focus:bg-white dark:focus:bg-gray-700 transition-all duration-300"
                    >
                      <option value="">Select Budget Range</option>
                      {budgetOptions.map((budget) => (
                        <option key={budget} value={budget}>
                          {budget}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center space-x-2 sm:space-x-3 pt-6">
                    <input
                      type="checkbox"
                      id="urgent"
                      name="urgent"
                      checked={formData.urgent}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-indigo-600 dark:text-indigo-400 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded focus:ring-indigo-500 focus:ring-2"
                    />
                    <label
                      htmlFor="urgent"
                      className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      This is an urgent project
                    </label>
                  </div>
                </div>

                <div className="group">
                  <label
                    htmlFor="message"
                    className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1 sm:mb-2"
                  >
                    Project Details *
                  </label>
                  <div className="relative">
                    <MessageCircle className="absolute left-3 sm:left-4 top-3 sm:top-4 text-gray-400 h-4 w-4 sm:h-5 sm:w-5 group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400 transition-colors duration-300" />
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className={`w-full pl-9 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-4 bg-gray-50/80 dark:bg-gray-700/80 border-2 rounded-lg sm:rounded-xl text-sm sm:text-base text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none transition-all duration-300 resize-none ${
                        errors.message
                          ? "border-red-400 focus:border-red-500 bg-red-50/50 dark:bg-red-900/20"
                          : "border-gray-200 dark:border-gray-600 focus:border-indigo-500 hover:border-gray-300 dark:hover:border-gray-500 focus:bg-white dark:focus:bg-gray-700"
                      }`}
                      placeholder="Tell us about your project goals, timeline, specific requirements, and any other details that would help us understand your needs better..."
                      value={formData.message}
                      onChange={handleInputChange}
                    />
                  </div>
                  {errors.message && (
                    <p className="mt-1 text-xs sm:text-sm text-red-500 dark:text-red-400 animate-pulse">
                      {errors.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap gap-3 sm:gap-4 justify-center">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="inline-flex items-center px-6 sm:px-8 py-2 sm:py-3 bg-[var(--color-accent)] text-white text-sm sm:text-base font-medium rounded-lg shadow hover:shadow-md transition-all duration-300 hover:scale-105"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="animate-spin h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center px-6 sm:px-8 py-2 sm:py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm sm:text-base font-semibold rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 sm:focus:ring-4 focus:ring-gray-300/50 transition-all duration-300 border border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
                  >
                    Clear Form
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
