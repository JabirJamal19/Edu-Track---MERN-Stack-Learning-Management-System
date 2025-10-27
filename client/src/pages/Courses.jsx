import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/common/Navbar'
import { Search, Filter, BookOpen, Clock, Users, Star } from 'lucide-react'

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedLevel, setSelectedLevel] = useState('all')

  const categories = [
    'All',
    'Programming',
    'Design',
    'Business',
    'Marketing',
    'Data Science',
    'Web Development',
  ]

  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced']

  // Mock courses data (replace with actual API call)
  const courses = [
    {
      id: 1,
      title: 'Complete Web Development Bootcamp',
      description: 'Learn HTML, CSS, JavaScript, React, Node.js and more',
      instructor: 'John Doe',
      category: 'Web Development',
      level: 'Beginner',
      price: 49.99,
      rating: 4.8,
      students: 15234,
      duration: '40 hours',
      thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop',
    },
    {
      id: 2,
      title: 'Advanced React and Redux',
      description: 'Master React, Redux, and modern frontend development',
      instructor: 'Jane Smith',
      category: 'Programming',
      level: 'Advanced',
      price: 79.99,
      rating: 4.9,
      students: 8567,
      duration: '30 hours',
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop',
    },
    {
      id: 3,
      title: 'UI/UX Design Fundamentals',
      description: 'Learn the principles of great user interface and experience design',
      instructor: 'Mike Johnson',
      category: 'Design',
      level: 'Beginner',
      price: 39.99,
      rating: 4.7,
      students: 12456,
      duration: '25 hours',
      thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Page Header */}
      <div className="bg-gradient-primary text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-heading font-bold mb-4">Explore Courses</h1>
          <p className="text-xl text-gray-100">
            Discover thousands of courses from expert instructors
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="card sticky top-4">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Filters
              </h3>

              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Category</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        value={category.toLowerCase()}
                        checked={selectedCategory === category.toLowerCase()}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="mr-2"
                      />
                      <span className="text-sm">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Level Filter */}
              <div>
                <h4 className="font-medium mb-3">Level</h4>
                <div className="space-y-2">
                  {levels.map((level) => (
                    <label key={level} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="level"
                        value={level.toLowerCase()}
                        checked={selectedLevel === level.toLowerCase()}
                        onChange={(e) => setSelectedLevel(e.target.value)}
                        className="mr-2"
                      />
                      <span className="text-sm">{level}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Courses Grid */}
          <div className="lg:col-span-3">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search courses..."
                  className="input pl-10 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-4">
              <p className="text-gray-600">
                Showing <span className="font-semibold">{courses.length}</span> courses
              </p>
            </div>

            {/* Course Cards */}
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {courses.map((course) => (
                <Link
                  key={course.id}
                  to={`/courses/${course.id}`}
                  className="card group hover:shadow-xl transition-all duration-300"
                >
                  {/* Course Thumbnail */}
                  <div className="relative overflow-hidden rounded-lg mb-4">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2">
                      <span className="badge badge-primary">{course.level}</span>
                    </div>
                  </div>

                  {/* Course Info */}
                  <div>
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-primary-600 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {course.description}
                    </p>

                    <div className="flex items-center text-sm text-gray-600 mb-3">
                      <img
                        src="https://via.placeholder.com/32"
                        alt={course.instructor}
                        className="w-6 h-6 rounded-full mr-2"
                      />
                      <span>{course.instructor}</span>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center text-sm text-gray-600 mb-3 space-x-4">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                        <span>{course.rating}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        <span>{course.students.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{course.duration}</span>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between pt-3 border-t">
                      <span className="text-2xl font-bold text-primary-600">
                        ${course.price}
                      </span>
                      <button className="btn btn-primary btn-sm">
                        Enroll Now
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Courses
