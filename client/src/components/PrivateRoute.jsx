import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
export default function PrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    //show children
    currentUser ? <Outlet /> : <Navigate to="/sign-in"/>

    );
}
