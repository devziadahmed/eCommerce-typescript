import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { setUnlockedPage } from "@store/auth/authSlice";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const { accessToken } = useAppSelector((state) => state.auth);

  if (!accessToken) {
    dispatch(setUnlockedPage(pathname));
    return <Navigate to="/login?message=login_required" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
