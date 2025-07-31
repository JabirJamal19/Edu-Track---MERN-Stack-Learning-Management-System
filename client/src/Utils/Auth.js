import {jwtDecode} from "jwt-decode";

export const getToken = () => localStorage.getItem("token");

export const getUserFromToken = () => {
  const token = getToken();
  if (!token) return null;
  try {
    return jwtDecode(token);
  } catch (error) {
    return null;
  }
};

export const isAdmin = () => {
  const user = getUserFromToken();
  return user?.role === "admin";
};
