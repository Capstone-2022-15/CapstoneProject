import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
  const token = window.localStorage.getItem("accessToken");
  if (token) {
    return true;
  } else {
    return false;
  }
};

function PublicRoutes() {
  const auth = useAuth();
  return auth ? <Navigate to="/main" replace /> : <Outlet />;
}

export default PublicRoutes;
