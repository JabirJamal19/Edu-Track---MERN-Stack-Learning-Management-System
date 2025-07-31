import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import AdminDashboard from "./Pages/Dashboard/Admindashboard";
import StudentDashboard from "./Pages/Dashboard/Studentdashboard";
import ProtectedRoute from "./Components/ProtectedRoute";
import AdminUsers from "./Pages/Dashboard/AdminUser";
import AuthPage from "./Pages/Authpage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard/users"
          element={
            <ProtectedRoute role="admin">
            <h1 className="text-3xl font-bold text-blue-600">Tailwind is working!</h1>
              <AdminUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute role="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
