import { NavLink, useLocation } from "react-router-dom";
import Modal from "./Modal";
import { adminlogout } from "../features/LoginLogout/AdminLoginLogout";
import { useDispatch, useSelector } from "react-redux";
import ProfImg from "../assets/profimg.png";

const LeftNavigation = () => {
  const path = useLocation();
  const dispatch = useDispatch();
  const admindetails = useSelector((state) => state.adminSlice.value);

  const LogOut = () => {
    dispatch(adminlogout());
  };

  return (
    <div className="left-panel">
      <div className="left-panel-ele gap-5">
        <div className="img-back">
          <div className="img-width">
            <img src={ProfImg} alt="Reload" />
          </div>
        </div>

        <div className="admin-nav">
          <ul className="admin-nav-ul">
            <li
              className={path.pathname === "/admin/regusers" ? "tab-act" : ""}
            >
              <i className="fa-solid fa-users px-2"></i>
              <NavLink to={"/admin/regusers"}> Registered Users</NavLink>
            </li>
            <li
              className={path.pathname === "/admin/products" ? "tab-act" : ""}
            >
              <i className="fa-solid fa-feather px-2"></i>
              <NavLink to={"/admin/products"}>Products</NavLink>
            </li>
            <li className={path.pathname === "/admin/orders" ? "tab-act" : ""}>
              <i className="fa-solid fa-list-check px-2"></i>
              <NavLink to={"/admin/orders"}>Orders Details</NavLink>
            </li>
            <li
              className={path.pathname === "/admin/bookings" ? "tab-act" : ""}
            >
              <i className="fa-solid fa-people-group px-1"></i>
              <NavLink to={"/admin/bookings"}> Bookings</NavLink>
            </li>

            <li className={path.pathname === "/admin" ? "tab-act" : ""}>
              <i className="fa-solid fa-screwdriver-wrench px-2"></i>
              {admindetails ? (
                <span role="button" onClick={LogOut}>
                  Logout
                </span>
              ) : (
                <NavLink to={"/admin"}>Login</NavLink>
              )}
            </li>
            <li
              className="btn btn-primary btn-lg"
              data-bs-toggle="modal"
              data-bs-target="#modalId"
            >
              Add Admin
              <Modal />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LeftNavigation;
