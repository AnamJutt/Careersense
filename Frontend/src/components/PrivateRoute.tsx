import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const token = localStorage.getItem("token");
  return user && token ? children : <Navigate to="/signin" />;
};
