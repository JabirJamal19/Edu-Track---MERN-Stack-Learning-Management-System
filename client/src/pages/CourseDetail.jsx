import { Link, useParams } from 'react-router-dom'
import { Clock, Users, Star, BookOpen, Award, CheckCircle, PlayCircle } from 'lucide-react'

const CourseDetail = () => {
  const { id } = useParams()

  // Mock course data (replace with actual API call)
  const course = {
    id: 1,
    title: 'Complete Web Development Bootcamp',
    description: 'Learn HTML, CSS, JavaScript, React, Node.js and everything you need to become a full-stack web developer',
    instructor: {
      name: 'John Doe',
      title: 'Senior Web Developer',
      avatar: 'https://via.placeholder.com/100',
      bio: '10+ years of experience in web development',
    },
    category: 'Web Development',
    level: 'Beginner',
    price: 49.99,
    rating: 4.8,
    students: 15234,
    duration: '40 hours',
    thumbnail: 'https://via.placeholder.com/800x400',
    lastUpdated: '2024-01-15',
    learningOutcomes: [
      'Build responsive websites using HTML, CSS, and JavaScript',
      'Master React and build modern single-page applications',
      'Create backend APIs with Node.js and Express',
      'Work with databases like MongoDB',
      'Deploy applications to production',
      'Understand version control with Git and GitHub',
    ],
    requirements: [
      'Basic computer skills',
      'No programming experience needed',
      'A computer with internet connection',
    ],
    modules: [
      {
        title: 'Introduction to Web Development',
        lessons: [
          { title: 'What is Web Development?', duration: '10:00', type: 'video' },
          { title: 'Setting up your development environment', duration: '15:00', type: 'video' },
          { title: 'Your first HTML page', duration: '20:00', type: 'video' },
        ],
      },
      {
        title: 'HTML Fundamentals',
        lessons: [
          { title: 'HTML Structure and Elements', duration: '25:00', type: 'video' },
          { title: 'Forms and Input Types', duration: '30:00', type: 'video' },
          { title: 'Semantic HTML', duration: '20:00', type: 'video' },
        ],
      },
      {
        title: 'CSS Styling',
        lessons: [
          { title: 'CSS Basics', duration: '25:00', type: 'video' },
          { title: 'Flexbox and Grid', duration: '35:00', type: 'video' },
          { title: 'Responsive Design', duration: '30:00', type: 'video' },
        ],
      },
    ],
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-heading font-bold text-gradient">
                EduTrack
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/courses" className="text-gray-700 hover:text-primary-600">
                Courses
              </Link>
              <Link to="/login" className="btn btn-outline">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Course Header */}
      <div className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="mb-4">
                <span className="badge bg-primary-500 text-white">{course.category}</span>
              </div>
              <h1 className="text-4xl font-heading font-bold mb-4">{course.title}</h1>
              <p className="text-xl text-gray-300 mb-6">{course.description}</p>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 fill-current mr-2" />
                  <span className="font-semibold">{course.rating}</span>
                  <span className="text-gray-400 ml-1">({course.students.toLocaleString()} students)</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>{course.duration} total</span>
                </div>
                <div className="flex items-center">
                  <BookOpen className="w-5 h-5 mr-2" />
                  <span>{course.level}</span>
                </div>
              </div>

              {/* Instructor */}
              <div className="mt-6 flex items-center">
                <img
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <p className="text-sm text-gray-400">Created by</p>
                  <p className="font-semibold">{course.instructor.name}</p>
                </div>
              </div>
            </div>

            {/* Enrollment Card - Desktop */}
            <div className="hidden lg:block">
              <div className="card sticky top-4">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full rounded-lg mb-4"
                />
                <div className="text-3xl font-bold text-primary-600 mb-4">
                  ${course.price}
                </div>
                <button className="btn btn-primary w-full mb-3">
                  Enroll Now
                </button>
                <button className="btn btn-outline w-full mb-4">
                  Add to Cart
                </button>
                <div className="text-sm text-gray-600">
                  <p className="mb-2">This course includes:</p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <PlayCircle className="w-4 h-4 mr-2" />
                      {course.duration} on-demand video
                    </li>
                    <li className="flex items-center">
                      <Award className="w-4 h-4 mr-2" />
                      Certificate of completion
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Full lifetime access
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* What You'll Learn */}
            <div className="card mb-8">
              <h2 className="text-2xl font-heading font-bold mb-6">What you'll learn</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {course.learningOutcomes.map((outcome, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-secondary-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{outcome}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Requirements */}
            <div className="card mb-8">
              <h2 className="text-2xl font-heading font-bold mb-6">Requirements</h2>
              <ul className="space-y-2">
                {course.requirements.map((req, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-gray-400 mr-3">•</span>
                    <span className="text-gray-700">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Course Content */}
            <div className="card mb-8">
              <h2 className="text-2xl font-heading font-bold mb-6">Course Content</h2>
              <div className="space-y-4">
                {course.modules.map((module, index) => (
                  <details key={index} className="border rounded-lg">
                    <summary className="cursor-pointer p-4 hover:bg-gray-50 font-semibold">
                      {module.title} ({module.lessons.length} lessons)
                    </summary>
                    <div className="border-t">
                      {module.lessons.map((lesson, lessonIndex) => (
                        <div
                          key={lessonIndex}
                          className="p-4 border-b last:border-b-0 flex items-center justify-between hover:bg-gray-50"
                        >
                          <div className="flex items-center">
                            <PlayCircle className="w-5 h-5 text-gray-400 mr-3" />
                            <span className="text-gray-700">{lesson.title}</span>
                          </div>
                          <span className="text-sm text-gray-500">{lesson.duration}</span>
                        </div>
                      ))}
                    </div>
                  </details>
                ))}
              </div>
            </div>

            {/* Instructor */}
            <div className="card">
              <h2 className="text-2xl font-heading font-bold mb-6">Your Instructor</h2>
              <div className="flex items-start">
                <img
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  className="w-24 h-24 rounded-full mr-6"
                />
                <div>
                  <h3 className="text-xl font-semibold mb-1">{course.instructor.name}</h3>
                  <p className="text-gray-600 mb-3">{course.instructor.title}</p>
                  <p className="text-gray-700">{course.instructor.bio}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Enrollment Card */}
          <div className="lg:hidden">
            <div className="card sticky bottom-0 z-10">
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-primary-600">
                  ${course.price}
                </div>
                <button className="btn btn-primary">
                  Enroll Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseDetail
