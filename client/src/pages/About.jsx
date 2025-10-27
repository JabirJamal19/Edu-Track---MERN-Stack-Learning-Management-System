import { Link } from 'react-router-dom'
import Navbar from '../components/common/Navbar'
import Logo from '../components/common/Logo'
import ImageWithFallback from '../components/common/ImageWithFallback'
import { Target, Eye, Award, Users, BookOpen, Globe, Heart, Zap } from 'lucide-react'

const About = () => {
  const values = [
    {
      icon: Heart,
      title: 'Student-Centered',
      description: 'We put learners first in everything we do, creating experiences that make learning engaging and effective.',
    },
    {
      icon: Award,
      title: 'Quality Education',
      description: 'Our courses are created by industry experts and regularly updated to reflect current best practices.',
    },
    {
      icon: Globe,
      title: 'Accessibility',
      description: 'Education should be accessible to everyone, everywhere. We make learning available to all.',
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'We constantly innovate our platform with the latest technology to enhance the learning experience.',
    },
  ]

  const team = [
    {
      name: 'John Anderson',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=faces',
      bio: 'Former educator with a passion for making quality education accessible',
    },
    {
      name: 'Sarah Mitchell',
      role: 'Chief Technology Officer',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=faces',
      bio: 'Tech leader with 15+ years building scalable education platforms',
    },
    {
      name: 'David Kim',
      role: 'Head of Content',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=faces',
      bio: 'Curriculum designer ensuring every course meets the highest standards',
    },
    {
      name: 'Maria Garcia',
      role: 'VP of Student Success',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=faces',
      bio: 'Dedicated to ensuring every student achieves their learning goals',
    },
  ]

  const stats = [
    { number: '1M+', label: 'Active Students' },
    { number: '5000+', label: 'Expert Instructors' },
    { number: '10K+', label: 'Quality Courses' },
    { number: '150+', label: 'Countries Reached' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6">
              About EduTrack
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto">
              We're on a mission to make quality education accessible to everyone, everywhere
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-5xl font-bold text-primary-600 mb-2">{stat.number}</div>
                <div className="text-gray-600 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-heading font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  EduTrack was founded in 2020 with a simple yet powerful vision: to democratize education
                  and make learning accessible to everyone, regardless of their location or background.
                </p>
                <p>
                  What started as a small platform with just 10 courses has grown into a global learning
                  community with over 1 million students and thousands of expert instructors from around
                  the world.
                </p>
                <p>
                  Today, we continue to innovate and expand our offerings, staying committed to our core
                  mission of providing high-quality, affordable education to learners everywhere.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="card bg-primary-50">
                <BookOpen className="w-12 h-12 text-primary-600 mb-4" />
                <h3 className="font-semibold text-xl mb-2">Expert-Led</h3>
                <p className="text-gray-600">Courses taught by industry professionals</p>
              </div>
              <div className="card bg-secondary-50">
                <Users className="w-12 h-12 text-secondary-600 mb-4" />
                <h3 className="font-semibold text-xl mb-2">Community</h3>
                <p className="text-gray-600">Join millions of learners worldwide</p>
              </div>
              <div className="card bg-accent-50">
                <Award className="w-12 h-12 text-accent-600 mb-4" />
                <h3 className="font-semibold text-xl mb-2">Certified</h3>
                <p className="text-gray-600">Earn recognized certificates</p>
              </div>
              <div className="card bg-yellow-50">
                <Zap className="w-12 h-12 text-yellow-600 mb-4" />
                <h3 className="font-semibold text-xl mb-2">Flexible</h3>
                <p className="text-gray-600">Learn at your own pace</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="card bg-white">
              <Target className="w-16 h-16 text-primary-600 mb-4" />
              <h2 className="text-3xl font-heading font-bold mb-4">Our Mission</h2>
              <p className="text-gray-700 text-lg">
                To empower individuals worldwide by providing access to high-quality education that
                transforms lives and opens doors to new opportunities. We believe that education is
                the key to personal and professional growth.
              </p>
            </div>
            <div className="card bg-white">
              <Eye className="w-16 h-16 text-primary-600 mb-4" />
              <h2 className="text-3xl font-heading font-bold mb-4">Our Vision</h2>
              <p className="text-gray-700 text-lg">
                To be the world's most trusted learning platform where anyone can learn anything,
                create a global community of lifelong learners, and bridge the gap between education
                and career success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <div key={index} className="card text-center hover:shadow-xl transition-all">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600">The passionate people behind EduTrack</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="card text-center hover:shadow-xl transition-shadow">
                <div className="w-32 h-32 rounded-full mx-auto mb-4 ring-4 ring-primary-100 overflow-hidden">
                  <ImageWithFallback
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full"
                    objectFit="cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-primary-600 font-medium text-sm mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            ))}
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
            Join millions of students and start your learning journey today
          </p>
          <Link to="/register" className="btn bg-white text-primary-600 hover:bg-gray-100 px-8 py-3 text-lg">
            Get Started Now
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

export default About
