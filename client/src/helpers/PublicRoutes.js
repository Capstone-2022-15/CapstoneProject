import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
  const token = localStorage.getItem("login-token");
  if (token) {
    return true;
  } else {
    return false;
  }
};

function PublicRoutes() {
  const auth = useAuth();
  return auth ? <Navigate to="/" /> : <Outlet />;
}

export default PublicRoutes;
