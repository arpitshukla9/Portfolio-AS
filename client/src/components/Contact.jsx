import React, { useState } from 'react';
import { Mail, Phone, User, MessageCircle, Send, RefreshCw, CheckCircle, XCircle, Github, Linkedin,Instagram , MapPin, Clock } from 'lucide-react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    services: [],
    budget: '',
    message: '',
    urgent: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [showToast, setShowToast] = useState(false);

  const serviceOptions = [
    'Web Development',
    'Mobile Apps',
    'UI/UX Design',
    'E-commerce',
    'Digital Marketing',
    'SEO Services',
    'Cloud Solutions',
    'Consulting'
  ];

  const budgetOptions = [
    'Less than 350$',
    '$400 - $750',
    '$750 - $1000',
    '$1000+',
    'Not Sure'
  ];

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name is required (min 2 characters)';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (formData.services.length === 0) {
      newErrors.services = 'Please select at least one service';
    }

    if (!formData.message.trim() || formData.message.trim().length < 20) {
      newErrors.message = 'Message is required (min 20 characters)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleServiceChange = (service) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));

    if (errors.services) {
      setErrors(prev => ({
        ...prev,
        services: ''
      }));
    }
  };

  const submitToBackend = async (data) => {
   const response = await fetch('https://portfolio-as.onrender.com/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        referrer: document.referrer,
        source: 'website_contact_form'
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      const firstErrorField = Object.keys(errors)[0];
      const element = document.getElementById(firstErrorField);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.focus();
      }
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const result = await submitToBackend(formData);
      
      setSubmitStatus('success');
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        company: '',
        services: [],
        budget: '',
        message: '',
        urgent: false
      });

      if (typeof gtag !== 'undefined') {
        gtag('event', 'form_submit', {
          event_category: 'contact',
          event_label: 'contact_form_success'
        });
      }

    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      
      if (typeof gtag !== 'undefined') {
        gtag('event', 'form_error', {
          event_category: 'contact',
          event_label: error.message
        });
      }
    } finally {
      setIsSubmitting(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 6000);
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      company: '',
      services: [],
      budget: '',
      message: '',
      urgent: false
    });
    setErrors({});
    setSubmitStatus(null);
  };

  return (
   <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 p-8 md:p-12 lg:p-16">
      <div className="p-6">
  <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-center bg-gradient-to-r from-emerald-700 via-teal-600 to-cyan-500 bg-clip-text text-transparent">
    Contact Us
  </h1>
  <p className="mt-4 max-w-2xl mx-auto text-center text-lg text-gray-900">
    We'd love to hear from you! Whether you have a question, feedback, or just want to say hello—drop us a message and we’ll get back to you as soon as possible.
  </p>
</div>

      <div className="max-w-7xl mx-auto">
        {showToast && (
          <div className={`fixed top-4 right-4 z-50 p-4 rounded-2xl shadow-2xl transform transition-all duration-500 max-w-sm ${
            showToast ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-full opacity-0 scale-95'
          } ${
            submitStatus === 'success' 
              ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' 
              : 'bg-gradient-to-r from-red-500 to-pink-500 text-white'
          }`}>
            <div className="flex items-start space-x-3">
              {submitStatus === 'success' ? (
                <CheckCircle className="h-6 w-6 flex-shrink-0 mt-0.5" />
              ) : (
                <XCircle className="h-6 w-6 flex-shrink-0 mt-0.5" />
              )}
              <div>
                <h4 className="font-semibold text-sm">
                  {submitStatus === 'success' ? 'Message Sent!' : 'Submission Failed'}
                </h4>
                <p className="text-sm opacity-90 mt-1">
                  {submitStatus === 'success' 
                    ? 'We\'ll get back to you within 24 hours.' 
                    : 'Please try again or contact us directly.'}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="lg:grid lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="text-center lg:text-left mb-12 lg:mb-0">
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-400 bg-clip-text text-transparent mb-6">
                Let's Build Something Amazing
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0 mb-8">
                Transform your ideas into reality. Our expert team is ready to help you create exceptional digital experiences.
              </p>

              <div className="space-y-6 mb-8">
                <div className="flex items-center justify-center lg:justify-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Mail className="h-5 w-5 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-gray-500 font-medium">Email Us</p>
                    <a href="mailto:arpit.shukla.work.gmail.com" className="text-gray-900 hover:text-blue-600 transition-colors font-semibold">
                      AS@company.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center justify-center lg:justify-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                    <Phone className="h-5 w-5 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-gray-500 font-medium">Call Us</p>
                    <a href="tel:+9058635750" className="text-gray-900 hover:text-blue-600 transition-colors font-semibold">
                      just call
                    </a>
                  </div>
                </div>

                <div className="flex items-center justify-center lg:justify-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-gray-500 font-medium">Visit Us</p>
                    <p className="text-gray-900 font-semibold">Mathura, Uttar Pradesh</p>
                  </div>
                </div>

                <div className="flex items-center justify-center lg:justify-start space-x-4">
                 
                </div>
              </div>

              <div className="flex justify-center lg:justify-start space-x-4">
                <a href="https://github.com/arpitshukla9" className="w-12 h-12 bg-gray-100 hover:bg-blue-100 rounded-full flex items-center justify-center text-gray-600 hover:text-blue-600 transition-all duration-300 hover:scale-110">
                  <Github className="h-5 w-5" />
                </a>
                <a href="https://www.linkedin.com/in/9arpitshukla" className="w-12 h-12 bg-gray-100 hover:bg-blue-100 rounded-full flex items-center justify-center text-gray-600 hover:text-blue-600 transition-all duration-300 hover:scale-110">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="https://instagram.com/thetaaverse" className="w-12 h-12 bg-gray-100 hover:bg-purple-100 rounded-full flex items-center justify-center text-gray-600 hover:text-purple-600 transition-all duration-300 hover:scale-110">
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 xl:col-span-8">
            <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-6 sm:p-8 lg:p-10">
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="group">
                    <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 group-focus-within:text-blue-600 transition-colors duration-300" />
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className={`w-full pl-12 pr-4 py-3.5 bg-gray-50/80 border-2 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none transition-all duration-300 ${
                          errors.fullName 
                            ? 'border-red-400 focus:border-red-500 bg-red-50/50' 
                            : 'border-gray-200 focus:border-blue-500 hover:border-gray-300 focus:bg-white'
                        }`}
                        placeholder="Arpit Shukla"
                      />
                    </div>
                    {errors.fullName && (
                      <p className="mt-2 text-sm text-red-500 animate-pulse">{errors.fullName}</p>
                    )}
                  </div>

                  <div className="group">
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 group-focus-within:text-blue-600 transition-colors duration-300" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full pl-12 pr-4 py-3.5 bg-gray-50/80 border-2 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none transition-all duration-300 ${
                          errors.email 
                            ? 'border-red-400 focus:border-red-500 bg-red-50/50' 
                            : 'border-gray-200 focus:border-blue-500 hover:border-gray-300 focus:bg-white'
                        }`}
                        placeholder="arpit@example.com"
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-2 text-sm text-red-500 animate-pulse">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="group">
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 group-focus-within:text-blue-600 transition-colors duration-300" />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full pl-12 pr-4 py-3.5 bg-gray-50/80 border-2 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none transition-all duration-300 ${
                          errors.phone 
                            ? 'border-red-400 focus:border-red-500 bg-red-50/50' 
                            : 'border-gray-200 focus:border-blue-500 hover:border-gray-300 focus:bg-white'
                        }`}
                        placeholder="+91 9988776655"
                      />
                    </div>
                    {errors.phone && (
                      <p className="mt-2 text-sm text-red-500 animate-pulse">{errors.phone}</p>
                    )}
                  </div>

                  <div className="group">
                    <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3.5 bg-gray-50/80 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 hover:border-gray-300 focus:bg-white transition-all duration-300"
                      placeholder="Your Company"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-4">
                    Services Needed *
                  </label>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    {serviceOptions.map((service) => (
                      <label
                        key={service}
                        className={`relative flex items-center justify-center p-3 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:scale-105 ${
                          formData.services.includes(service)
                            ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-md'
                            : 'border-gray-200 hover:border-gray-300 text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={formData.services.includes(service)}
                          onChange={() => handleServiceChange(service)}
                        />
                        <span className="text-sm font-medium text-center">{service}</span>
                      </label>
                    ))}
                  </div>
                  {errors.services && (
                    <p className="mt-2 text-sm text-red-500 animate-pulse">{errors.services}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="budget" className="block text-sm font-semibold text-gray-700 mb-2">
                      Project Budget
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3.5 bg-gray-50/80 border-2 border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-blue-500 hover:border-gray-300 focus:bg-white transition-all duration-300"
                    >
                      <option value="">Select Budget Range</option>
                      {budgetOptions.map((budget) => (
                        <option key={budget} value={budget}>{budget}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center space-x-3 pt-6">
                    <input
                      type="checkbox"
                      id="urgent"
                      name="urgent"
                      checked={formData.urgent}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <label htmlFor="urgent" className="text-sm font-medium text-gray-700">
                      This is an urgent project
                    </label>
                  </div>
                </div>

                <div className="group">
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Project Details *
                  </label>
                  <div className="relative">
                    <MessageCircle className="absolute left-4 top-4 text-gray-400 h-5 w-5 group-focus-within:text-blue-600 transition-colors duration-300" />
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      className={`w-full pl-12 pr-4 py-4 bg-gray-50/80 border-2 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none transition-all duration-300 resize-none ${
                        errors.message 
                          ? 'border-red-400 focus:border-red-500 bg-red-50/50' 
                          : 'border-gray-200 focus:border-blue-500 hover:border-gray-300 focus:bg-white'
                      }`}
                      placeholder="Tell us about your project goals, timeline, specific requirements, and any other details that would help us understand your needs better..."
                    />
                  </div>
                  {errors.message && (
                    <p className="mt-2 text-sm text-red-500 animate-pulse">{errors.message}</p>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex-1 flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="animate-spin h-5 w-5 mr-2" />
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </button>
                  
                  <button
                    type="button"
                    onClick={handleReset}
                    className="flex-1 sm:flex-none px-8 py-4 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-300/50 transition-all duration-300 border border-gray-300 hover:border-gray-400"
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