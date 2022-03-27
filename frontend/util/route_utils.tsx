import React from "react"
import { Outlet, Navigate } from "react-router"

export const ProtectedRoutes = ({ loggedIn }: {loggedIn: boolean}) => {
  return loggedIn ? <Outlet /> : <Navigate to="/" />;
}

export const AuthRoutes = ({ loggedIn }: {loggedIn: boolean}) => {
  return !loggedIn ? <Outlet /> : <Navigate to="/home" />;
}