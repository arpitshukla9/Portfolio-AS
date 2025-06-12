'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Rocket, Code, Lightbulb, GraduationCap, Mail, Check, Loader2 } from 'lucide-react'

const CollabForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: 'project',
    message: '',
    github: ''
  })
  const [status, setStatus] = useState('idle')
  const [errors, setErrors] = useState({})

  const collaborationTypes = [
    { value: 'project', label: 'College Project', icon: <GraduationCap className="w-5 h-5" /> },
    { value: 'startup', label: 'Startup Idea', icon: <Lightbulb className="w-5 h-5" /> },
    { value: 'hackathon', label: 'Hackathon', icon: <Code className="w-5 h-5" /> },
    { value: 'other', label: 'Other', icon: <Mail className="w-5 h-5" /> }
  ]

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Name required'
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = 'Valid email required'
    if (!formData.message.trim()) newErrors.message = 'Message required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setStatus('submitting')
    console.log("Sending data:", formData)

    try {
      const response = await fetch('https://portfolio-as.onrender.com/api/collaborate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })


      if (!response.ok) throw new Error('Submission failed')
      setStatus('success')
      setFormData({
        name: '',
        email: '',
        type: 'project',
        message: '',
        github: ''
      })
    } catch (error) {
      console.error(error)
      setStatus('error')
    } finally {
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  return (
    <div className="w-full px-4 py-16 bg-gradient-to-br from-pink-50 via-purple-50 to-white">

      <div className="grid md:grid-cols-2 gap-8 items-center bg-white rounded-3xl shadow-xl p-6 md:p-10 border border-pink-100">

        {/* Video Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative rounded-2xl overflow-hidden shadow-lg border-4 border-pink-100"
        >
          <video
            src='/videos/robot-gif.mp4'
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-auto rounded-2xl"
            poster="/images/collab-poster.jpg"
          >
            <source src="/videos/collab-demo.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-transparent pointer-events-none" />
        </motion.div>

        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-8 rounded-2xl shadow-lg border border-pink-100"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-pink-100">
              <Rocket className="w-6 h-6 text-pink-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Collaborate With Us</h2>
              <p className="text-gray-500">Let's create something extraordinary together</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Type Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Project Type</label>
              <div className="grid grid-cols-2 gap-2">
                {collaborationTypes.map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, type: type.value }))}
                    className={`flex items-center justify-center gap-2 p-2.5 rounded-lg border text-sm transition-all ${
                      formData.type === type.value
                        ? 'bg-pink-50 border-pink-200 text-pink-700'
                        : 'bg-white border-gray-200 hover:bg-gray-50 text-gray-600'
                    }`}
                  >
                    {type.icon}
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Name & Email */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 rounded-lg ${
                    errors.name ? 'border-red-300' : 'focus:border-pink-300'
                  } focus:ring-1 focus:ring-pink-200 transition-all outline-none`}
                />
                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 rounded-lg ${
                    errors.email ? 'border-red-300' : 'focus:border-pink-300'
                  } text-gray-700 focus:ring-1 focus:ring-pink-200 transition-all outline-none`}
                />
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
              </div>
            </div>

            {/* GitHub (conditionally shown) */}
            {formData.type === 'project' && (
              <div>
                <label htmlFor="github" className="block text-sm font-medium text-gray-700 mb-1">
                  GitHub Repository (optional)
                </label>
                <input
                  id="github"
                  name="github"
                  type="url"
                  value={formData.github}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg focus:border-pink-300 text-gray-700 focus:ring-1 focus:ring-pink-200 transition-all outline-none"
                />
              </div>
            )}

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                {formData.type === 'project' ? 'Project Details' :
                  formData.type === 'startup' ? 'Startup Description' :
                    formData.type === 'hackathon' ? 'Hackathon Info' : 'Your Message'}
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 rounded-lg ${
                  errors.message ? 'border-red-300' : 'focus:border-pink-300'
                } text-gray-700 focus:ring-1 focus:ring-pink-200 transition-all outline-none`}
              ></textarea>
              {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={status === 'submitting'}
                className={`w-full py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 transition-all ${
                  status === 'submitting'
                    ? 'bg-pink-300 cursor-not-allowed'
                    : 'bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-md hover:shadow-lg'
                }`}
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : status === 'success' ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Submitted Successfully!</span>
                  </>
                ) : (
                  <>
                    <Rocket className="w-5 h-5" />
                    <span>Send Collaboration Request</span>
                  </>
                )}
              </button>
              {status === 'error' && (
                <p className="mt-2 text-center text-sm text-red-500">
                  Submission failed. Please try again or email us directly.
                </p>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

export default CollabForm