import { Link } from "react-router-dom";
import yogguruvideo from "../../assets/yogguruvideo.mp4";
import "../../assets/css/font.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../assets/css/register.css";
import Form from "../../components/Form";
const Register = () => {
  return (
    <div
      className="container-fluid d-flex  justify-content-center align-items-center py-5"
      style={{ backgroundColor: "#faeeea" }}
    >
      <div
        className="container-lg-fluid  d-flex justify-content-around align-items-center 
      gap-2 w-100"
      >
        <div className=" d-lg-block d-none">
          <video width="500" height="400" autoPlay="autoplay">
            <source src={yogguruvideo} type="video/mp4" />
          </video>
        </div>
        <div
          className="d-flex justify-content-center align-items-center flex-column gap-1 p-2
             h-100 rounded-3 register-box text-uppercase  py-4"
        >
          <div className="heading">
            Register <i className="fa-solid fa-user-plus px-2"></i>
            <p id="dot"></p>
          </div>
          <div
            className="d-flex flex-column justify-content-center align-items-center  gap-4 h-100 
                "
          >
            <Form />
            <Link to={"/Login"}>
              <input
                type="button"
                className="btn btn-outline-dark text-decoration-underline text-primary"
                value="Already Have Acoount?"
              />
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

export default Register;
