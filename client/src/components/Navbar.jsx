import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { logout } from "../features/LoginLogout/LoginLogout";

const Navbar = () => {
  const { cart } = useSelector((state) => state.cartSlice);
  const pathname = useLocation();
  const userdetails = useSelector((state) => state.userSlice.value);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOut = () => {
    axios
      .get("http://localhost:3004/logout")
      .then((res) => {
        if (res.status === 200) {
          dispatch(logout());

          navigate("/");
        }
      })
      .catch((err) => console.error("Error while Logging Out ", err?.message));
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <div className="container-fluid px-5">
          <a className="navbar-brand w-25" href="/">
            <div className="w-25 heading">YogGuru🧘‍♀️</div>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse"
            id="navbarSupportedCojntent"
          >
            <ul
              className="navbar-nav ml-auto mb-2 mb-lg-0"
              style={{ marginLeft: "auto", paddingRight: 30 }}
            >
              <li className="nav-item">
                <Link
                  className={`nav-link   ${
                    pathname.pathname === "/" ? "text-info" : "text-white"
                  }`}
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link   ${
                    pathname.pathname === "/Product1"
                      ? "text-info"
                      : "text-white"
                  }`}
                  to="/Product1"
                >
                  Products<i className="fa-solid fa-feather px-1"></i>
                </Link>
              </li>
              {userdetails && (
                <li className="nav-item">
                  <Link
                    className={`nav-link   ${
                      pathname.pathname === "/MyCart"
                        ? "text-info"
                        : "text-white"
                    }`}
                    to="/MyCart"
                  >
                    {/* Mycart🛒 */}
                    Cart<i className="fa-solid fa-cart-plus px-1"></i>
                    <span className="badge rounded-pill text-bg-primary position-absolute top-0 ">
                      {cart.length}
                    </span>
                  </Link>
                </li>
              )}
              {userdetails && (
                <li className="nav-item">
                  <Link
                    className={`nav-link   ${
                      pathname.pathname === "/YogaAssistant"
                        ? "text-info"
                        : "text-white"
                    }`}
                    to="/YogaAssistant"
                  >
                    {/* Mycart🛒 */}
                    YogaAssistant
                    <i className="fa-solid fa-handshake-angle px-1"></i>
                  </Link>
                </li>
              )}

              {userdetails && (
                <li className="nav-item">
                  <Link
                    className={`nav-link   ${
                      pathname.pathname === "/Profile" ||
                      pathname.pathname === "/orderhist"
                        ? "text-info"
                        : "text-white"
                    }`}
                    to="/Profile"
                  >
                    {/* Mycart🛒 */}
                    Profile<i className="fa-solid fa-user px-2"></i>
                  </Link>
                </li>
              )}
              {userdetails && (
                <>
                  {userdetails.Role === "Trainer" ? (
                    <>
                      <li className="nav-item dropdown">
                        <a
                          className={`nav-link  dropdown-toggle ${
                            pathname.pathname === `/Room/${userdetails?._id}` ||
                            pathname.pathname === "/ViewAppoinments"
                              ? "text-info"
                              : "text-white"
                          }`}
                          data-bs-toggle="dropdown"
                          href="#"
                          role="button"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          Yoga Class
                        </a>
                        <div className="dropdown-menu">
                          <Link
                            to={`/Room/${userdetails?._id}`}
                            className="dropdown-item"
                          >
                            Join Class
                          </Link>
                          <div className="dropdown-divider"></div>
                          <Link
                            to={"/ViewAppoinments"}
                            className="dropdown-item"
                          >
                            Mark Attendance
                          </Link>
                        </div>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="nav-item">
                        <Link
                          className={`nav-link   ${
                            pathname.pathname === "/BookAppoinments"
                              ? "text-info"
                              : "text-white"
                          }`}
                          to={"/BookAppoinments"}
                        >
                          BookAppoinments
                          <i className="fa-solid fa-people-group px-1"></i>
                        </Link>
                      </li>
                    </>
                  )}
                </>
              )}

              <li className="nav-item">
                <Link
                  className={`nav-link   ${
                    pathname.pathname === "/About" ? "text-info" : "text-white"
                  }`}
                  to="/About"
                >
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link   ${
                    pathname.pathname === "/Contact"
                      ? "text-info"
                      : "text-white"
                  }`}
                  to="/Contact"
                >
                  Contact
                </Link>
              </li>
            </ul>

            {userdetails === null ? (
              <Link className="nav-link" aria-current="page" to="/Login">
                <button className="btn btn-outline-primary">
                  Login<i className="fa-solid fa-screwdriver-wrench px-2"></i>
                </button>
              </Link>
            ) : (
              <div className="d-flex  gap-3">
                <button
                  className="btn btn-outline-primary"
                  onClick={() => {
                    logOut();
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
