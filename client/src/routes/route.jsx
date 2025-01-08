import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

import Home from "../pages/Users/Home";
import Contact from "../pages/Users/Contact";
import Product1 from "../pages/Users/Product1";
import Product2 from "../pages/Users/Product2";
import Mycart from "../pages/Users/Mycart";
import About from "../pages/Users/About";
import { Routes, Route } from "react-router-dom";
import Register from "../pages/Users/Register";
import Login from "../pages/Users/Login";
import Orders from "../pages/Users/Orders";
import NotFound from "../pages/Users/NotFound";
import Payment from "../pages/Users/Payment";
import Success from "../pages/Users/Success";
import Failure from "../pages/Users/Failure";
import ViewAppoinments from "../pages/Users/ViewAppoinments";
import BookAppoinments from "../pages/Users/BookAppoinments";
import "../assets/css/home.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/LoginLogout/LoginLogout";
import { useLocation } from "react-router-dom";
import axios from "axios";
import LeftNavigation from "../Components/LeftNavigation";
import "../assets/css/admin.css";
import AddProducts from "../pages/Admin/AddProducts";
import AdminLogin from "../pages/Admin/AdminLogin";
import ProtectedRoute from "./ProtectedRoute";
import RegisteredUsers from "../pages/Admin/RegisteredUsers";
import Products from "../pages/Admin/Products";
import AllOrders from "../pages/Admin/AllOrders";
import Parorder from "../pages/Admin/Parorder";
import YogaAssistant from "../pages/Users/YogaAssistant";
import Attendance from "../pages/Users/Attendance";
import Form2 from "../Components/Form2";
import { adminlogin } from "../features/LoginLogout/AdminLoginLogout";
import AdminProtectedRoute from "./AdminProtectedRoute";
import Dashboard from "../pages/Admin/Dashboard";
import Bookings from "../pages/Admin/Bookings";
import Profile from "../pages/Users/Profile";
import Room from "../pages/Users/Room";

const NaviagationRoutes = () => {
  let path = useLocation();
  path = path.pathname.toLowerCase();
  const dispatch = useDispatch();
  const userdetails = useSelector((state) => state.userSlice.value);
  const admindetails = useSelector((state) => state.adminSlice.value);

  useEffect(() => {
    axios.get("http://localhost:3004/auth/checklogin").then((res) => {
      if (res) {
        dispatch(login(res.data.user[0]));
      }
    });
  }, []);
  useEffect(() => {
    axios.get("http://localhost:3004/auth/checkadminlogin").then((res) => {
      if (res) {
        dispatch(adminlogin(res.data.admin[0]));
      }
    });
  }, []);

  if (path.startsWith("/admin") || path.startsWith("/admin/")) {
    return (
      <div
        className="d-flex w-100 "
        style={{ background: " rgb(250, 238, 234)" }}
      >
        <LeftNavigation />
        <Routes>
          <Route exact path="/admin" element={<AdminLogin />}></Route>
          <Route exact path="/admin/Dashboard" element={<Dashboard />}></Route>

          <Route element={<AdminProtectedRoute admindetails={admindetails} />}>
            <Route
              exact
              path="/admin/addproducts/:ProductId?"
              element={<AddProducts />}
            ></Route>
            <Route
              exact
              path="/admin/addproducts"
              element={<AddProducts />}
            ></Route>
            <Route
              exact
              path="/admin/regusers"
              element={<RegisteredUsers />}
            ></Route>
            <Route exact path="/admin/products" element={<Products />}></Route>
            <Route exact path="/admin/orders" element={<AllOrders />}></Route>
            <Route exact path="/admin/bookings" element={<Bookings />}></Route>
            <Route
              exact
              path="/admin/parorder/:OrderId"
              element={<Parorder />}
            ></Route>
          </Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
    );
  }
  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/Contact" element={<Contact />}></Route>
        <Route exact path="/Product1" element={<Product1 />}></Route>
        <Route exact path="/Product2/:ProductId" element={<Product2 />}></Route>

        <Route exact path="/About" element={<About />}></Route>
        <Route exact path="/Register" element={<Register />}></Route>
        <Route exact path="/Login" element={<Login />}></Route>
        <Route exact path="/Form2" element={<Form2 />}></Route>
        <Route exact path="/Room/:roomID" element={<Room />}></Route>

        {/* <Route
          exact
          path="/Mycart"
          element={userdetails === null ? <Login /> : <Mycart />}
        ></Route>
        <Route
          exact
          path="/Orders"
          element={userdetails === null ? <Login /> : <Orders />}
        ></Route>
        <Route
          exact
          path="/ViewAppoinments"
          element={userdetails === null ? <Login /> : <ViewAppoinments />}
        ></Route>
        <Route
          exact
          path="/BookAppoinments"
          element={userdetails === null ? <Login /> : <BookAppoinments />}
        ></Route> */}

        <Route element={<ProtectedRoute userdetails={userdetails} />}>
          <Route
            exact
            path="/YogaAssistant"
            element={<YogaAssistant />}
          ></Route>
          <Route exact path="/Mycart" element={<Mycart />}></Route>
          <Route
            exact
            path="/Attendance/:Trainee"
            element={<Attendance />}
          ></Route>
          <Route exact path="/Orders" element={<Orders />}></Route>
          <Route exact path="/orderhist" element={<Profile />}></Route>
          <Route
            exact
            path="/ViewAppoinments"
            element={<ViewAppoinments />}
          ></Route>
          <Route
            exact
            path="/BookAppoinments"
            element={<BookAppoinments />}
          ></Route>{" "}
        </Route>
        <Route
          exact
          path="/BookAppoinments/:TrainerId"
          element={<Product2 />}
        ></Route>
        <Route exact path="/Profile" element={<Profile />}></Route>

        <Route exact path="/Payment" element={<Payment />}></Route>
        <Route exact path="/Success" element={<Success />}></Route>
        <Route exact path="/Failure" element={<Failure />}></Route>

        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      <Footer />
    </div>
  );
};

export default NaviagationRoutes;
