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

function PrivateRoutes() {
  const auth = useAuth();
  return auth ? <Outlet /> : <Navigate to="/" replace />;
}

export default PrivateRoutes;
