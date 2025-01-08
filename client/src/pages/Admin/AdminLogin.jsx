import axios from "axios";
import { useState } from "react";
import { adminlogin } from "../../features/LoginLogout/AdminLoginLogout";
import { useDispatch } from "react-redux";

const AdminLogin = () => {
  const [adminCredentials, setAdminCredentials] = useState({
    admin: "",
    password: "",
  });
  const dispatch = useDispatch();

  const AdminLogin = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post(
        "http://localhost:3004/admin/adminlogin",
        adminCredentials
      );

      dispatch(adminlogin(result.data.result[0]));
    } catch (error) {
      console.error("Error While Login In Admin :" + error?.message);
    }
  };
  const handleChange = (e) => {
    setAdminCredentials({
      ...adminCredentials,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="d-flex  mx-auto align-items-center">
      <form onSubmit={AdminLogin} className="d-flex justify-content-center ">
        <div className="d-flex flex-column gap-4 align-items-center p-5 rounded-3  BlueGradientBackColour">
          <div className="heading">Admin Login</div>

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              name="admin"
              id="admin"
              placeholder="UserName"
              value={adminCredentials.admin}
              onChange={handleChange}
            />
            <label htmlFor="admin">UserName</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              name="password"
              id="password"
              placeholder="Password"
              value={adminCredentials.password}
              onChange={handleChange}
            />
            <label htmlFor="password">Password</label>
          </div>
          <div className="w-100">
            <button className="btn btn-outline-primary btn-light text-uppercase w-100">
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
