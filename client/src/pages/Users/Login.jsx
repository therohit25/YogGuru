import axios from "axios";
import "../../assets/css/login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../features/LoginLogout/LoginLogout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const LoginSub = () => {
    axios
      .post("https://yogguru-backend.onrender.com/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        if (res) {
          if (res.data.result.length > 0) {
            dispatch(login(res.data.result[0]));
          }
          toast(res.data.msg, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          setTimeout(() => {
            navigate("/MyCart");
          }, 2500);
        }
      })
      .catch((err) => console.error(err));
  };
  return (
    <div
      className="container-fluid-lg d-flex heightweight100 justify-content-center align-items-center"
      style={{ backgroundColor: "#faeeea" }}
    >
      <div className="container  d-flex justify-content-center align-items-center  h-75 w-50">
        <div
          className="d-flex justify-content-center align-items-center flex-column gap-4
            p-5   rounded-3 w-md-50  login-box text-uppercase"
        >
          <div className="heading">
            Login <i className="fa-solid fa-screwdriver-wrench px-2"></i>
            <p id="dot"></p>
          </div>
          <div
            className="d-flex flex-column justify-content-center align-items-center  gap-4 h-100 
                "
          >
            <div className="gap-5 d-flex flex-column justify-content-center align-items-center ">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter Email"
                className="w-100  inputField text-black"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter Password"
                className="w-100  inputField text-black"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />

              <button
                className="btn btn-primary  form-control"
                onClick={LoginSub}
              >
                SignIn
                <i className="fa-solid fa-arrow-right-to-bracket px-2"></i>
              </button>
            </div>
            <Link to={"/Register"}>
              <button className="btn btn-outline-dark text-decoration-underline text-primary">
                New User?<i className="fa-solid fa-user-plus px-2"></i>
              </button>
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Login;
