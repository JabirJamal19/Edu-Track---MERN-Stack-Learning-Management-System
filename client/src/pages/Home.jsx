import { Link } from 'react-router-dom'
import Navbar from '../components/common/Navbar'
import Logo from '../components/common/Logo'
import { BookOpen, Users, Award, TrendingUp } from 'lucide-react'

const Home = () => {
  const features = [
    {
      icon: BookOpen,
      title: 'Quality Courses',
      description: 'Access a wide range of high-quality courses from expert instructors',
    },
    {
      icon: Users,
      title: 'Expert Instructors',
      description: 'Learn from industry professionals and experienced educators',
    },
    {
      icon: Award,
      title: 'Certificates',
      description: 'Earn recognized certificates upon course completion',
    },
    {
      icon: TrendingUp,
      title: 'Track Progress',
      description: 'Monitor your learning journey with detailed analytics',
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6">
              Learn Without Limits
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-100 max-w-3xl mx-auto">
              Access thousands of courses, develop new skills, and advance your career with EduTrack
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/courses" className="btn bg-white text-primary-600 hover:bg-gray-100 px-8 py-3 text-lg">
                Explore Courses
              </Link>
              <Link to="/register" className="btn border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-3 text-lg">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold mb-4">Why Choose EduTrack?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We provide everything you need for a successful learning journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="card text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-primary-600 mb-2">10K+</div>
              <div className="text-gray-600 text-lg">Active Students</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-primary-600 mb-2">500+</div>
              <div className="text-gray-600 text-lg">Expert Instructors</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-primary-600 mb-2">1000+</div>
              <div className="text-gray-600 text-lg">Online Courses</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-primary text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-heading font-bold mb-4">
            Ready to Start Learning?
          </h2>
          <p className="text-xl mb-8 text-gray-100">
            Join thousands of students already learning on EduTrack
          </p>
          <Link to="/register" className="btn bg-white text-primary-600 hover:bg-gray-100 px-8 py-3 text-lg">
            Sign Up Now
          </Link>
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

export default Home
