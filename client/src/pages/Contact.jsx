import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/common/Navbar'
import Logo from '../components/common/Logo'
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react'
import { toast } from 'react-toastify'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      toast.success('Message sent successfully! We\'ll get back to you soon.')
      setFormData({ name: '', email: '', subject: '', message: '' })
      setLoading(false)
    }, 1000)
  }

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      details: 'support@edutrack.com',
      link: 'mailto:support@edutrack.com',
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: '+1 (555) 123-4567',
      link: 'tel:+15551234567',
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: '123 Learning Street, Education City, EC 12345',
      link: '#',
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      details: 'Available Mon-Fri, 9AM-5PM EST',
      link: '#',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-100 max-w-2xl mx-auto">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => {
              const Icon = info.icon
              return (
                <a
                  key={index}
                  href={info.link}
                  className="card text-center hover:shadow-xl transition-all group"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4 group-hover:bg-primary-600 group-hover:text-white transition-all">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{info.title}</h3>
                  <p className="text-gray-600 text-sm">{info.details}</p>
                </a>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="card">
              <h2 className="text-2xl font-heading font-bold mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="input"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
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
                    required
                    className="input"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    className="input"
                    placeholder="How can we help?"
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows="6"
                    className="input"
                    placeholder="Tell us more about your inquiry..."
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary w-full flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <div className="spinner w-5 h-5 mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Map & Additional Info */}
            <div className="space-y-6">
              <div className="card">
                <h2 className="text-2xl font-heading font-bold mb-4">Office Hours</h2>
                <div className="space-y-3 text-gray-700">
                  <div className="flex justify-between py-2 border-b">
                    <span className="font-medium">Monday - Friday</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="font-medium">Saturday</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="font-medium">Sunday</span>
                    <span className="text-gray-500">Closed</span>
                  </div>
                </div>
              </div>

              <div className="card bg-primary-50">
                <h3 className="text-xl font-semibold mb-3">Quick Response</h3>
                <p className="text-gray-700 mb-4">
                  We typically respond to all inquiries within 24 hours during business days.
                  For urgent matters, please call us directly.
                </p>
                <a href="tel:+15551234567" className="btn btn-primary">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now
                </a>
              </div>

              <div className="card">
                <h3 className="text-xl font-semibold mb-3">Other Ways to Reach Us</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-primary-600 rounded-full mr-3"></span>
                    Visit our <Link to="/help" className="text-primary-600 hover:underline mx-1">Help Center</Link> for instant answers
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-primary-600 rounded-full mr-3"></span>
                    Check our <Link to="/faq" className="text-primary-600 hover:underline mx-1">FAQ</Link> page
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-primary-600 rounded-full mr-3"></span>
                    Connect with us on social media
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <Logo className="mb-4" />
              <p className="text-gray-400">
                Empowering learners worldwide with quality education
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/courses" className="hover:text-white">Courses</Link></li>
                <li><Link to="/instructors" className="hover:text-white">Instructors</Link></li>
                <li><Link to="/about" className="hover:text-white">About Us</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/help" className="hover:text-white">Help Center</Link></li>
                <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link to="/faq" className="hover:text-white">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} EduTrack. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Contact
