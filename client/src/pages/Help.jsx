import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/common/Navbar'
import Logo from '../components/common/Logo'
import { Search, BookOpen, Video, FileText, HelpCircle, MessageCircle, Mail, ChevronRight } from 'lucide-react'

const Help = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const categories = [
    {
      icon: BookOpen,
      title: 'Getting Started',
      description: 'Learn the basics of using EduTrack',
      articles: 12,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: Video,
      title: 'Taking Courses',
      description: 'How to enroll and complete courses',
      articles: 18,
      color: 'bg-green-100 text-green-600',
    },
    {
      icon: FileText,
      title: 'Account Settings',
      description: 'Manage your profile and preferences',
      articles: 15,
      color: 'bg-purple-100 text-purple-600',
    },
    {
      icon: HelpCircle,
      title: 'Troubleshooting',
      description: 'Common issues and solutions',
      articles: 20,
      color: 'bg-red-100 text-red-600',
    },
    {
      icon: MessageCircle,
      title: 'For Instructors',
      description: 'Creating and managing courses',
      articles: 25,
      color: 'bg-yellow-100 text-yellow-600',
    },
    {
      icon: Mail,
      title: 'Billing & Payments',
      description: 'Subscriptions and refunds',
      articles: 10,
      color: 'bg-pink-100 text-pink-600',
    },
  ]

  const popularArticles = [
    'How do I enroll in a course?',
    'How to reset my password',
    'Understanding course certificates',
    'How to contact an instructor',
    'Refund and cancellation policy',
    'System requirements for video playback',
    'How to download course materials',
    'Managing notification preferences',
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section with Search */}
      <section className="bg-gradient-primary text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              How can we help you?
            </h1>
            <p className="text-xl text-gray-100">
              Search our knowledge base or browse categories below
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-6 w-6 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search for answers..."
              className="w-full pl-12 pr-4 py-4 rounded-lg text-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-heading font-bold mb-8 text-center">Browse by Category</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => {
              const Icon = category.icon
              return (
                <Link
                  key={index}
                  to={`/help/${category.title.toLowerCase().replace(/\s+/g, '-')}`}
                  className="card group hover:shadow-xl transition-all"
                >
                  <div className={`inline-flex items-center justify-center w-14 h-14 ${category.color} rounded-lg mb-4`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-600 transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">{category.articles} articles</span>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary-600 transition-colors" />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Popular Articles */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-heading font-bold mb-8 text-center">Popular Articles</h2>
          <div className="max-w-3xl mx-auto">
            <div className="card">
              <ul className="divide-y">
                {popularArticles.map((article, index) => (
                  <li key={index}>
                    <Link
                      to={`/help/article/${index + 1}`}
                      className="flex items-center justify-between py-4 hover:bg-gray-50 px-4 -mx-4 rounded-lg transition-colors group"
                    >
                      <div className="flex items-center">
                        <HelpCircle className="w-5 h-5 text-primary-600 mr-3" />
                        <span className="text-gray-700 group-hover:text-primary-600 transition-colors">
                          {article}
                        </span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary-600 transition-colors" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Support CTA */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card text-center">
            <MessageCircle className="w-16 h-16 text-primary-600 mx-auto mb-4" />
            <h2 className="text-3xl font-heading font-bold mb-4">
              Can't find what you're looking for?
            </h2>
            <p className="text-xl text-gray-600 mb-6">
              Our support team is here to help you
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn btn-primary">
                <Mail className="w-5 h-5 mr-2" />
                Contact Support
              </Link>
              <Link to="/faq" className="btn btn-outline">
                View FAQ
              </Link>
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

export default Help
