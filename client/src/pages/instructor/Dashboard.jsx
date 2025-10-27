import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import Logo from '../../components/common/Logo'
import ImageWithFallback from '../../components/common/ImageWithFallback'
import { BookOpen, Users, DollarSign, TrendingUp, Plus, Bell, LogOut, User, Menu, X, Edit, Trash2 } from 'lucide-react'

const InstructorDashboard = () => {
  const { user, logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Mock data (replace with actual API calls)
  const myCourses = [
    {
      id: 1,
      title: 'Complete Web Development Bootcamp',
      students: 15234,
      rating: 4.8,
      revenue: 45670,
      status: 'published',
      thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop',
    },
    {
      id: 2,
      title: 'Advanced React and Redux',
      students: 8567,
      rating: 4.9,
      revenue: 34250,
      status: 'published',
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop',
    },
    {
      id: 3,
      title: 'Node.js Masterclass',
      students: 0,
      rating: 0,
      revenue: 0,
      status: 'draft',
      thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=300&fit=crop',
    },
  ]

  const stats = {
    totalStudents: 23801,
    totalRevenue: 79920,
    activeCourses: 2,
    avgRating: 4.85,
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
              to="/instructor/dashboard"
              className="flex items-center px-4 py-3 text-primary-600 bg-primary-50 rounded-lg font-medium"
            >
              <BookOpen className="w-5 h-5 mr-3" />
              Dashboard
            </Link>
            <Link
              to="/instructor/courses"
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg"
            >
              <BookOpen className="w-5 h-5 mr-3" />
              My Courses
            </Link>
            <Link
              to="/instructor/students"
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg"
            >
              <Users className="w-5 h-5 mr-3" />
              Students
            </Link>
            <Link
              to="/instructor/analytics"
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg"
            >
              <TrendingUp className="w-5 h-5 mr-3" />
              Analytics
            </Link>
            <Link
              to="/instructor/revenue"
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg"
            >
              <DollarSign className="w-5 h-5 mr-3" />
              Revenue
            </Link>
          </nav>

          {/* User Section */}
          <div className="p-4 border-t">
            <Link
              to="/instructor/profile"
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
              <h1 className="text-2xl font-heading font-bold">Instructor Dashboard</h1>
            </div>

            <div className="flex items-center space-x-4">
              <Link to="/instructor/courses/create" className="btn btn-primary hidden md:flex items-center">
                <Plus className="w-5 h-5 mr-2" />
                Create Course
              </Link>
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
                  <p className="text-gray-600 text-sm mb-1">Total Students</p>
                  <p className="text-3xl font-bold text-primary-600">{stats.totalStudents.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary-600" />
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Total Revenue</p>
                  <p className="text-3xl font-bold text-secondary-600">${stats.totalRevenue.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-secondary-600" />
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Active Courses</p>
                  <p className="text-3xl font-bold text-accent-600">{stats.activeCourses}</p>
                </div>
                <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-accent-600" />
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Avg Rating</p>
                  <p className="text-3xl font-bold text-yellow-600">{stats.avgRating}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Create Course CTA - Mobile */}
          <div className="md:hidden mb-6">
            <Link to="/instructor/courses/create" className="btn btn-primary w-full flex items-center justify-center">
              <Plus className="w-5 h-5 mr-2" />
              Create New Course
            </Link>
          </div>

          {/* My Courses */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-heading font-bold">My Courses</h2>
              <Link to="/instructor/courses" className="text-primary-600 hover:text-primary-700 font-medium">
                View All
              </Link>
            </div>

            <div className="grid gap-6">
              {myCourses.map((course) => (
                <div key={course.id} className="card hover:shadow-xl transition-all">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Course Thumbnail */}
                    <div className="w-full md:w-48 h-32 rounded-lg overflow-hidden flex-shrink-0">
                      <ImageWithFallback
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full"
                        objectFit="cover"
                      />
                    </div>

                    {/* Course Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-xl font-semibold mb-1">{course.title}</h3>
                          <span
                            className={`badge ${
                              course.status === 'published' ? 'badge-success' : 'badge-warning'
                            }`}
                          >
                            {course.status}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <Link
                            to={`/instructor/courses/${course.id}/edit`}
                            className="p-2 hover:bg-gray-100 rounded-lg"
                          >
                            <Edit className="w-5 h-5 text-gray-600" />
                          </Link>
                          <button className="p-2 hover:bg-gray-100 rounded-lg">
                            <Trash2 className="w-5 h-5 text-red-600" />
                          </button>
                        </div>
                      </div>

                      {/* Course Stats */}
                      <div className="grid grid-cols-3 gap-4 mt-4">
                        <div>
                          <p className="text-sm text-gray-600">Students</p>
                          <p className="text-lg font-semibold">{course.students.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Rating</p>
                          <p className="text-lg font-semibold">
                            {course.rating > 0 ? `⭐ ${course.rating}` : 'N/A'}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Revenue</p>
                          <p className="text-lg font-semibold">${course.revenue.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h2 className="text-2xl font-heading font-bold mb-4">Recent Activity</h2>
            <div className="card">
              <p className="text-gray-600">No recent activity to display.</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default InstructorDashboard
