import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Logo from './Logo'
import { Menu, X } from 'lucide-react'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const navLinks = [
    { path: '/courses', label: 'Courses' },
    { path: '/instructors', label: 'Instructors' },
    { path: '/about', label: 'About' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-base font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-primary-600'
                    : 'text-gray-700 hover:text-primary-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            <div className="flex items-center space-x-3">
              <Link to="/login" className="btn btn-outline px-6">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary px-6">
                Sign Up
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(link.path)
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="px-3 py-2 space-y-2">
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="btn btn-outline w-full"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setIsMenuOpen(false)}
                className="btn btn-primary w-full"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
