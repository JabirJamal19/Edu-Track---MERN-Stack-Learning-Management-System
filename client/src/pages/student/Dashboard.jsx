import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import Logo from '../../components/common/Logo'
import ImageWithFallback from '../../components/common/ImageWithFallback'
import { BookOpen, Clock, TrendingUp, Award, Bell, LogOut, User, Menu, X } from 'lucide-react'

const StudentDashboard = () => {
  const { user, logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Mock data (replace with actual API calls)
  const enrolledCourses = [
    {
      id: 1,
      title: 'Complete Web Development Bootcamp',
      progress: 45,
      instructor: 'John Doe',
      thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop',
      nextLesson: 'CSS Flexbox and Grid',
    },
    {
      id: 2,
      title: 'Advanced React and Redux',
      progress: 20,
      instructor: 'Jane Smith',
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop',
      nextLesson: 'Redux Toolkit Basics',
    },
    {
      id: 3,
      title: 'UI/UX Design Fundamentals',
      progress: 80,
      instructor: 'Mike Johnson',
      thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop',
      nextLesson: 'Design Systems',
    },
  ]

  const stats = {
    coursesEnrolled: 3,
    coursesCompleted: 1,
    hoursLearned: 45,
    certificatesEarned: 1,
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b">
            <Logo size="small" />
            <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            <Link
              to="/student/dashboard"
              className="flex items-center px-4 py-3 text-primary-600 bg-primary-50 rounded-lg font-medium"
            >
              <BookOpen className="w-5 h-5 mr-3" />
              My Courses
            </Link>
            <Link
              to="/student/progress"
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg"
            >
              <TrendingUp className="w-5 h-5 mr-3" />
              Progress
            </Link>
            <Link
              to="/student/certificates"
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg"
            >
              <Award className="w-5 h-5 mr-3" />
              Certificates
            </Link>
            <Link
              to="/courses"
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg"
            >
              <BookOpen className="w-5 h-5 mr-3" />
              Browse Courses
            </Link>
          </nav>

          {/* User Section */}
          <div className="p-4 border-t">
            <Link
              to="/student/profile"
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg mb-2"
            >
              <User className="w-5 h-5 mr-3" />
              Profile
            </Link>
            <button
              onClick={logout}
              className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm sticky top-0 z-30">
          <div className="flex items-center justify-between px-6 py-4">
            <button
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>

            <div className="flex-1 lg:flex-none">
              <h1 className="text-2xl font-heading font-bold">Welcome back, {user?.firstName}!</h1>
            </div>

            <div className="flex items-center space-x-4">
              <button className="relative p-2 hover:bg-gray-100 rounded-lg">
                <Bell className="w-6 h-6 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-primary-200">
                  <ImageWithFallback
                    src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.firstName}+${user?.lastName}&size=40&background=2563eb&color=fff`}
                    alt={user?.firstName}
                    className="w-full h-full"
                    objectFit="cover"
                  />
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium">{user?.firstName} {user?.lastName}</p>
                  <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          {/* Stats Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Enrolled Courses</p>
                  <p className="text-3xl font-bold text-primary-600">{stats.coursesEnrolled}</p>
                </div>
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-primary-600" />
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Completed</p>
                  <p className="text-3xl font-bold text-secondary-600">{stats.coursesCompleted}</p>
                </div>
                <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-secondary-600" />
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Hours Learned</p>
                  <p className="text-3xl font-bold text-accent-600">{stats.hoursLearned}</p>
                </div>
                <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-accent-600" />
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Certificates</p>
                  <p className="text-3xl font-bold text-yellow-600">{stats.certificatesEarned}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Continue Learning Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-heading font-bold mb-4">Continue Learning</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCourses.map((course) => (
                <div key={course.id} className="card group hover:shadow-xl transition-all">
                  <div className="w-full h-40 rounded-lg overflow-hidden mb-4">
                    <ImageWithFallback
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full"
                      objectFit="cover"
                    />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary-600 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">By {course.instructor}</p>

                  {/* Progress Bar */}
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-semibold text-primary-600">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary-600 h-2 rounded-full transition-all"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-4">
                    Next: <span className="font-medium">{course.nextLesson}</span>
                  </p>

                  <Link
                    to={`/student/courses/${course.id}`}
                    className="btn btn-primary w-full"
                  >
                    Continue Learning
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Courses */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-heading font-bold">Recommended for You</h2>
              <Link to="/courses" className="text-primary-600 hover:text-primary-700 font-medium">
                View All
              </Link>
            </div>
            <div className="card">
              <p className="text-gray-600">
                Explore more courses tailored to your learning path...
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default StudentDashboard
