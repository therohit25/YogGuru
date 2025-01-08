/* eslint-disable react/prop-types */

import Login from "../pages/Users/Login";
import { Outlet } from "react-router-dom";

const ProtectedRoute = ({ userdetails }) => {
  if (!userdetails) {
    return <Login />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
