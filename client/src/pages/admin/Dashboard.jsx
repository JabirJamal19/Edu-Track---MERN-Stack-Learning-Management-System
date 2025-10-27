import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import Logo from '../../components/common/Logo'
import ImageWithFallback from '../../components/common/ImageWithFallback'
import { 
  Users, BookOpen, DollarSign, TrendingUp, Bell, LogOut, User, 
  Menu, X, Settings, ShieldCheck, BarChart3, FileText 
} from 'lucide-react'

const AdminDashboard = () => {
  const { user, logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Mock data (replace with actual API calls)
  const stats = {
    totalUsers: 45623,
    totalCourses: 1234,
    totalRevenue: 234567,
    activeUsers: 12345,
  }

  const recentUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'student', joinDate: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'instructor', joinDate: '2024-01-14' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'student', joinDate: '2024-01-13' },
  ]

  const recentCourses = [
    { id: 1, title: 'Complete Web Development', instructor: 'John Doe', status: 'pending', createdAt: '2024-01-15' },
    { id: 2, title: 'Advanced React', instructor: 'Jane Smith', status: 'approved', createdAt: '2024-01-14' },
    { id: 3, title: 'UI/UX Design', instructor: 'Mike Johnson', status: 'pending', createdAt: '2024-01-13' },
  ]

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
              to="/admin/dashboard"
              className="flex items-center px-4 py-3 text-primary-600 bg-primary-50 rounded-lg font-medium"
            >
              <BarChart3 className="w-5 h-5 mr-3" />
              Dashboard
            </Link>
            <Link
              to="/admin/users"
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg"
            >
              <Users className="w-5 h-5 mr-3" />
              Users
            </Link>
            <Link
              to="/admin/courses"
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg"
            >
              <BookOpen className="w-5 h-5 mr-3" />
              Courses
            </Link>
            <Link
              to="/admin/analytics"
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg"
            >
              <TrendingUp className="w-5 h-5 mr-3" />
              Analytics
            </Link>
            <Link
              to="/admin/revenue"
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg"
            >
              <DollarSign className="w-5 h-5 mr-3" />
              Revenue
            </Link>
            <Link
              to="/admin/reports"
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg"
            >
              <FileText className="w-5 h-5 mr-3" />
              Reports
            </Link>
            <Link
              to="/admin/settings"
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg"
            >
              <Settings className="w-5 h-5 mr-3" />
              Settings
            </Link>
          </nav>

          {/* User Section */}
          <div className="p-4 border-t">
            <Link
              to="/admin/profile"
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
              <h1 className="text-2xl font-heading font-bold">Admin Dashboard</h1>
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
                  <p className="text-gray-600 text-sm mb-1">Total Users</p>
                  <p className="text-3xl font-bold text-primary-600">{stats.totalUsers.toLocaleString()}</p>
                  <p className="text-xs text-green-600 mt-1">↑ 12% from last month</p>
                </div>
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary-600" />
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Total Courses</p>
                  <p className="text-3xl font-bold text-secondary-600">{stats.totalCourses.toLocaleString()}</p>
                  <p className="text-xs text-green-600 mt-1">↑ 8% from last month</p>
                </div>
                <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-secondary-600" />
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Total Revenue</p>
                  <p className="text-3xl font-bold text-accent-600">${stats.totalRevenue.toLocaleString()}</p>
                  <p className="text-xs text-green-600 mt-1">↑ 15% from last month</p>
                </div>
                <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-accent-600" />
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Active Users</p>
                  <p className="text-3xl font-bold text-yellow-600">{stats.activeUsers.toLocaleString()}</p>
                  <p className="text-xs text-green-600 mt-1">↑ 5% from last month</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            {/* Recent Users */}
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-heading font-bold">Recent Users</h2>
                <Link to="/admin/users" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  View All
                </Link>
              </div>
              <div className="space-y-3">
                {recentUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <img
                        src="https://via.placeholder.com/40"
                        alt={user.name}
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                    </div>
                    <span className={`badge ${user.role === 'instructor' ? 'badge-primary' : 'badge-success'}`}>
                      {user.role}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pending Course Approvals */}
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-heading font-bold">Pending Approvals</h2>
                <Link to="/admin/courses" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  View All
                </Link>
              </div>
              <div className="space-y-3">
                {recentCourses.map((course) => (
                  <div key={course.id} className="p-3 hover:bg-gray-50 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <p className="font-medium">{course.title}</p>
                        <p className="text-sm text-gray-600">By {course.instructor}</p>
                      </div>
                      <span className={`badge ${course.status === 'approved' ? 'badge-success' : 'badge-warning'}`}>
                        {course.status}
                      </span>
                    </div>
                    {course.status === 'pending' && (
                      <div className="flex gap-2 mt-2">
                        <button className="btn btn-success btn-sm text-xs">
                          <ShieldCheck className="w-3 h-3 mr-1" />
                          Approve
                        </button>
                        <button className="btn btn-danger btn-sm text-xs">
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* System Activity */}
          <div className="card">
            <h2 className="text-xl font-heading font-bold mb-4">System Activity</h2>
            <div className="text-gray-600">
              <p>No recent system activity to display.</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default AdminDashboard
