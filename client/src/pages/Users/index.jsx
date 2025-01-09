import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Home from "./Home";
import Contact from "./Contact";
import Product1 from "./Product1";
import Product2 from "./Product2";
import Input from "./Input";
import Mycart from "./Mycart";
import About from "./About";
import { Routes, Route } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Orders from "./Orders";
import NotFound from "./NotFound";
import Payment from "./Payment";
import Success from "./Success";
import Failure from "./Failure";
import ViewAppoinments from "./ViewAppoinments";
import Admin from "../Admin/Admin";
import BookAppoinments from "./BookAppoinments";
import "../../assets/css/home.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/LoginLogout/LoginLogout";
import axios from "axios";

const User = () => {
  const dispatch = useDispatch();
  const userdetails = useSelector((state) => state.userSlice.value);

  useEffect(() => {
    axios
      .get("https://yogguru-backend.onrender.com/auth/checklogin")
      .then((res) => {
        if (res) {
          dispatch(login(res.data.user[0]));
        }
      });
  }, []);
  return (
    <>
      {/* <Router> */}
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/Contact" element={<Contact />}></Route>
        <Route exact path="/Product1" element={<Product1 />}></Route>
        <Route exact path="/Product2/:ProductId" element={<Product2 />}></Route>
        <Route
          exact
          path="/BookAppoinments/:TrainerId"
          element={<Product2 />}
        ></Route>

        <Route
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
        ></Route>

        <Route exact path="/Admin" element={<Admin />}></Route>
        <Route exact path="/About" element={<About />}></Route>
        <Route exact path="/Register" element={<Register />}></Route>
        <Route exact path="/Login" element={<Login />}></Route>
        <Route exact path="/Payment" element={<Payment />}></Route>
        <Route exact path="/Success" element={<Success />}></Route>
        <Route exact path="/Failure" element={<Failure />}></Route>
        <Route exact path="/Input" element={<Input />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>

      <Footer />
    </>
  );
};

export default User;
