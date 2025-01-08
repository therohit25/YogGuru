/* eslint-disable react/prop-types */
import { Outlet } from "react-router-dom";
import AdminLogin from "../pages/Admin/AdminLogin";

const AdminProtectedRoute = ({ admindetails }) => {
  if (!admindetails) {
    return <AdminLogin />;
  }

  return <Outlet />;
};

export default AdminProtectedRoute;
