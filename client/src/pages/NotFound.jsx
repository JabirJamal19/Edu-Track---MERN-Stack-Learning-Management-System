import { Link } from 'react-router-dom'
import { Home, ArrowLeft } from 'lucide-react'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-primary flex items-center justify-center px-4">
      <div className="text-center text-white">
        {/* 404 Illustration */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold opacity-20">404</h1>
          <div className="-mt-20">
            <svg
              className="w-64 h-64 mx-auto"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" opacity="0.3" />
              <path
                d="M12 8V12L14.5 14.5"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Error Message */}
        <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
          Page Not Found
        </h2>
        <p className="text-xl md:text-2xl text-gray-100 mb-8 max-w-md mx-auto">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => window.history.back()}
            className="btn bg-white text-primary-600 hover:bg-gray-100 px-6 py-3 text-lg inline-flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </button>
          <Link
            to="/"
            className="btn border-2 border-white text-white hover:bg-white hover:text-primary-600 px-6 py-3 text-lg inline-flex items-center justify-center"
          >
            <Home className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
        </div>

        {/* Helpful Links */}
        <div className="mt-12 pt-8 border-t border-white border-opacity-20">
          <p className="text-gray-200 mb-4">You might find these helpful:</p>
          <div className="flex flex-wrap gap-4 justify-center text-sm">
            <Link to="/courses" className="hover:underline">
              Browse Courses
            </Link>
            <span className="text-gray-400">•</span>
            <Link to="/login" className="hover:underline">
              Login
            </Link>
            <span className="text-gray-400">•</span>
            <Link to="/register" className="hover:underline">
              Sign Up
            </Link>
            <span className="text-gray-400">•</span>
            <Link to="/help" className="hover:underline">
              Help Center
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound
