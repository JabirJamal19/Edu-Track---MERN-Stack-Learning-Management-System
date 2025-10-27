import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/common/Navbar'
import Logo from '../components/common/Logo'
import { ChevronDown, ChevronUp, Search } from 'lucide-react'

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  const faqs = [
    {
      category: 'Getting Started',
      questions: [
        {
          q: 'How do I create an account?',
          a: 'Click on the "Sign Up" button in the top right corner, fill in your details, choose your role (student or instructor), and verify your email address.',
        },
        {
          q: 'Is EduTrack free to use?',
          a: 'EduTrack offers both free and paid courses. Creating an account is free, and you can access many free courses. Premium courses require payment.',
        },
        {
          q: 'What are the system requirements?',
          a: 'You need a modern web browser (Chrome, Firefox, Safari, or Edge), stable internet connection, and for some courses, specific software mentioned in the course requirements.',
        },
      ],
    },
    {
      category: 'Courses & Learning',
      questions: [
        {
          q: 'How do I enroll in a course?',
          a: 'Browse courses, click on one you\'re interested in, review the details, and click "Enroll Now". For paid courses, you\'ll be directed to payment first.',
        },
        {
          q: 'Can I access courses on mobile devices?',
          a: 'Yes! Our platform is fully responsive and works on smartphones, tablets, and desktop computers.',
        },
        {
          q: 'How long do I have access to a course?',
          a: 'Once enrolled, you have lifetime access to the course content, including all updates and new materials added by the instructor.',
        },
        {
          q: 'Can I download course videos?',
          a: 'Video downloads depend on the instructor\'s settings. Some courses allow offline viewing through our mobile app.',
        },
      ],
    },
    {
      category: 'Certificates & Progress',
      questions: [
        {
          q: 'Do I get a certificate after completing a course?',
          a: 'Yes! Upon completing all course requirements, you\'ll receive a certificate of completion that you can share on LinkedIn and your resume.',
        },
        {
          q: 'How is my progress tracked?',
          a: 'Your progress is automatically saved as you complete lessons, quizzes, and assignments. You can view your progress on your student dashboard.',
        },
        {
          q: 'What if I fail a quiz?',
          a: 'You can retake quizzes multiple times. Your highest score will be recorded. Review the course materials and try again!',
        },
      ],
    },
    {
      category: 'Payments & Refunds',
      questions: [
        {
          q: 'What payment methods do you accept?',
          a: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and other local payment methods depending on your region.',
        },
        {
          q: 'What is your refund policy?',
          a: 'We offer a 30-day money-back guarantee. If you\'re not satisfied with a course, request a refund within 30 days of purchase.',
        },
        {
          q: 'Are there any subscription plans?',
          a: 'Yes! We offer monthly and annual subscription plans that give you unlimited access to thousands of courses at a discounted rate.',
        },
      ],
    },
    {
      category: 'For Instructors',
      questions: [
        {
          q: 'How do I become an instructor?',
          a: 'Sign up as an instructor, create your profile, submit your first course for review, and once approved, you can start teaching!',
        },
        {
          q: 'How much money can I make?',
          a: 'Instructors earn 70% of the course price for direct sales. Earnings depend on course quality, marketing, and student enrollment.',
        },
        {
          q: 'What support do instructors get?',
          a: 'We provide course creation tools, marketing support, analytics dashboard, and dedicated instructor support team.',
        },
      ],
    },
    {
      category: 'Technical Issues',
      questions: [
        {
          q: 'Videos won\'t play. What should I do?',
          a: 'Check your internet connection, try refreshing the page, clear your browser cache, or try a different browser. If issues persist, contact support.',
        },
        {
          q: 'I forgot my password. How do I reset it?',
          a: 'Click "Forgot Password" on the login page, enter your email, and follow the instructions sent to your inbox.',
        },
        {
          q: 'How do I update my account information?',
          a: 'Go to your profile settings from the dashboard, where you can update your name, email, password, and other preferences.',
        },
      ],
    },
  ]

  const toggleQuestion = (categoryIndex, questionIndex) => {
    const key = `${categoryIndex}-${questionIndex}`
    setOpenIndex(openIndex === key ? null : key)
  }

  const filteredFaqs = searchQuery
    ? faqs.map(category => ({
        ...category,
        questions: category.questions.filter(
          q => q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
               q.a.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      })).filter(category => category.questions.length > 0)
    : faqs

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-primary text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-100">
              Find answers to common questions about EduTrack
            </p>
          </div>

          {/* Search */}
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-6 w-6 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search FAQs..."
              className="w-full pl-12 pr-4 py-4 rounded-lg text-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredFaqs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <h2 className="text-2xl font-heading font-bold mb-6 text-primary-600">
                {category.category}
              </h2>
              <div className="space-y-4">
                {category.questions.map((faq, questionIndex) => {
                  const key = `${categoryIndex}-${questionIndex}`
                  const isOpen = openIndex === key

                  return (
                    <div key={questionIndex} className="card">
                      <button
                        onClick={() => toggleQuestion(categoryIndex, questionIndex)}
                        className="w-full flex items-center justify-between text-left"
                      >
                        <span className="text-lg font-semibold text-gray-900 pr-4">
                          {faq.q}
                        </span>
                        {isOpen ? (
                          <ChevronUp className="w-6 h-6 text-primary-600 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-6 h-6 text-gray-400 flex-shrink-0" />
                        )}
                      </button>
                      {isOpen && (
                        <div className="mt-4 pt-4 border-t">
                          <p className="text-gray-700">{faq.a}</p>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-heading font-bold mb-4">
            Still have questions?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Can't find the answer you're looking for? Please reach out to our support team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn btn-primary">
              Contact Support
            </Link>
            <Link to="/help" className="btn btn-outline">
              Visit Help Center
            </Link>
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

export default FAQ
