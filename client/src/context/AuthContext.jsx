import { createContext, useState, useEffect } from 'react'
import api from '../utils/api'
import { toast } from 'react-toastify'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  // Load user from localStorage on mount
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('accessToken')
      
      if (token) {
        try {
          const response = await api.get('/auth/me')
          setUser(response.data.data)
          setIsAuthenticated(true)
        } catch (error) {
          localStorage.removeItem('accessToken')
          localStorage.removeItem('refreshToken')
        }
      }
      
      setLoading(false)
    }

    loadUser()
  }, [])

  // Login function
  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password })
      const { accessToken, refreshToken, user } = response.data

      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshToken', refreshToken)

      setUser(user)
      setIsAuthenticated(true)
      
      toast.success('Login successful!')
      return { success: true, user }
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed'
      toast.error(message)
      return { success: false, message }
    }
  }

  // Register function
  const register = async (userData) => {
    try {
      const response = await api.post('/auth/register', userData)
      const { accessToken, refreshToken, user } = response.data

      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshToken', refreshToken)

      setUser(user)
      setIsAuthenticated(true)
      
      toast.success('Registration successful!')
      return { success: true, user }
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed'
      toast.error(message)
      return { success: false, message }
    }
  }

  // Logout function
  const logout = async () => {
    try {
      await api.post('/auth/logout')
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      setUser(null)
      setIsAuthenticated(false)
      toast.info('Logged out successfully')
    }
  }

  // Update user profile
  const updateProfile = async (userData) => {
    try {
      const response = await api.put('/auth/updatedetails', userData)
      setUser(response.data.data)
      toast.success('Profile updated successfully!')
      return { success: true }
    } catch (error) {
      const message = error.response?.data?.message || 'Update failed'
      toast.error(message)
      return { success: false, message }
    }
  }

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
    updateProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
