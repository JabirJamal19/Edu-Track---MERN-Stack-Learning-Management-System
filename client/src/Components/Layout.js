import { useNavigate } from "react-router-dom";
import { getUserFromToken } from "../Utils/Auth"; // Removed getToken from import

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const user = getUserFromToken(); // This function internally uses getToken()

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-800 text-white p-4 flex justify-between items-center shadow">
        <h1 className="text-xl font-bold">EduTrack LMS</h1>
        <div className="space-x-4">
          {user && (
            <span className="text-sm">
              Logged in as: <strong>{user.role}</strong>
            </span>
          )}
          <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm">
            Logout
          </button>
        </div>
      </header>
      <main className="p-6">{children}</main>
    </div>
  );
};

export default Layout;