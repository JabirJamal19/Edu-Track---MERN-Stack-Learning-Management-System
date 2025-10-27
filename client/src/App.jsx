import { Routes, Route, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { useAuth } from './hooks/useAuth'
import LoadingSpinner from './components/common/LoadingSpinner'

// Lazy load pages
const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const StudentDashboard = lazy(() => import('./pages/student/Dashboard'))
const InstructorDashboard = lazy(() => import('./pages/instructor/Dashboard'))
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'))
const Courses = lazy(() => import('./pages/Courses'))
const CourseDetail = lazy(() => import('./pages/CourseDetail'))
const Instructors = lazy(() => import('./pages/Instructors'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const Help = lazy(() => import('./pages/Help'))
const FAQ = lazy(() => import('./pages/FAQ'))
const Privacy = lazy(() => import('./pages/Privacy'))
const Terms = lazy(() => import('./pages/Terms'))
const NotFound = lazy(() => import('./pages/NotFound'))

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isAuthenticated, loading } = useAuth()

  if (loading) {
    return <LoadingSpinner />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/" replace />
  }

  return children
}

// Public Route (redirect to dashboard if already logged in)
const PublicRoute = ({ children }) => {
  const { user, isAuthenticated, loading } = useAuth()

  if (loading) {
    return <LoadingSpinner />
  }

  if (isAuthenticated) {
    // Redirect to appropriate dashboard based on role
    const dashboardRoutes = {
      student: '/student/dashboard',
      instructor: '/instructor/dashboard',
      admin: '/admin/dashboard',
    }
    return <Navigate to={dashboardRoutes[user.role] || '/'} replace />
  }

  return children
}

function App() {
  return (
    <div className="min-h-screen">
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/instructors" element={<Instructors />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/help" element={<Help />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          
          {/* Auth Routes */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />

          {/* Student Routes */}
          <Route
            path="/student/dashboard"
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <StudentDashboard />
              </ProtectedRoute>
            }
          />

          {/* Instructor Routes */}
          <Route
            path="/instructor/dashboard"
            element={
              <ProtectedRoute allowedRoles={['instructor', 'admin']}>
                <InstructorDashboard />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* 404 Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default App
