"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, MapPin, MessageSquare, Phone } from "lucide-react"
import { useState } from "react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "general",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate form submission
    setTimeout(() => {
      console.log("Form submitted:", formData)
      setSubmitted(true)
      setFormData({ name: "", email: "", subject: "", category: "general", message: "" })
      setLoading(false)

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000)
    }, 800)
  }

  return (
    <main className="min-h-screen bg-linear-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="relative px-4 py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-blue-600/10 to-purple-600/10" />
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Get in <span className="text-blue-600">Touch</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions about LocalGuide? We&apos;d love to hear from you. Reach out to our team anytime.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="px-4 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              {
                icon: <Mail className="w-8 h-8" />,
                title: "Email",
                desc: "support@localguide.com",
                subdesc: "Response within 24 hours",
              },
              {
                icon: <Phone className="w-8 h-8" />,
                title: "Phone",
                desc: "+1 (555) 123-4567",
                subdesc: "Mon-Fri, 9AM-6PM EST",
              },
              {
                icon: <MapPin className="w-8 h-8" />,
                title: "Address",
                desc: "San Francisco, CA",
                subdesc: "Global presence, local support",
              },
            ].map((item) => (
              <Card key={item.title} className="text-center border-blue-100 hover:border-blue-300 transition">
                <CardContent className="pt-8">
                  <div className="flex justify-center mb-4 text-blue-600">{item.icon}</div>
                  <h3 className="font-bold text-lg text-gray-900 mb-1">{item.title}</h3>
                  <p className="font-medium text-gray-900 mb-1">{item.desc}</p>
                  <p className="text-sm text-gray-500">{item.subdesc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto">
            <Card className="border-blue-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-blue-600" />
                  Send us a Message
                </CardTitle>
                <CardDescription>
                  Fill out the form below and we&apos;ll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>

              <CardContent>
                {submitted && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
                    <p className="font-medium">Thank you for reaching out!</p>
                    <p className="text-sm">We&apos;ll be in touch within 24 hours.</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                      />
                    </div>
                  </div>

                  {/* Subject & Category Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        placeholder="How can we help?"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                      />
                    </div>
                    <div>
                      <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                      </label>
                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white"
                      >
                        <option value="general">General Inquiry</option>
                        <option value="support">Support</option>
                        <option value="partnership">Partnership</option>
                        <option value="feedback">Feedback</option>
                        <option value="bug">Bug Report</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Tell us what's on your mind..."
                      rows={6}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition"
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    We respect your privacy. Your information will be kept confidential.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-4 py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Frequently Asked Questions</h2>

          <div className="space-y-6">
            {[
              {
                q: "How do I become a guide on LocalGuide?",
                a: "Visit our sign-up page and select the 'Become a Guide' option. You'll need to provide information about your expertise, languages, and pricing. Our team will review your profile before approval.",
              },
              {
                q: "Is LocalGuide available in my city?",
                a: "We're constantly expanding! While we already have guides in 200+ cities, if your city isn't listed yet, reach out to us and we'll help connect you with guides.",
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major credit cards and digital payment methods. Payments are secure and encrypted for your protection.",
              },
              {
                q: "Can I cancel my booking?",
                a: "Yes! Most tours have flexible cancellation policies. You can cancel at least 24 hours before the tour start time for a full refund.",
              },
              {
                q: "How are guides verified?",
                a: "All guides undergo a verification process including identity checks and background verification. Guides are also reviewed and rated by travelers.",
              },
              {
                q: "Do you offer group discounts?",
                a: "Yes! We offer special rates for larger groups. Contact us directly for custom quotes and group booking arrangements.",
              },
            ].map((item, idx) => (
              <Card key={idx} className="border-gray-200">
                <CardContent className="p-6">
                  <h3 className="font-bold text-gray-900 mb-2">{item.q}</h3>
                  <p className="text-gray-600">{item.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
