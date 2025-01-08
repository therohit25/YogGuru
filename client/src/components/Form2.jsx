import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

const Form2 = ({ uid }) => {
  const [certificate, setCertificate] = useState("");
  const [datetime, setDatetime] = useState("");
  const [specialization, setSpecialization] = useState("");
  const navigate = useNavigate();
  const SignUpSub = (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("uid", uid);
    formdata.append("datetime", datetime);
    formdata.append("certificate", certificate);
    formdata.append("specialization", specialization);

    axios
      .put("http://localhost:3004/register", formdata)
      .then(() => {
        toast(" Registered Successfully Trainer!..!", {
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
          navigate("/Login");
        }, 1000);
      })
      .catch((err) => {
        console.error(`Error while Registering Trainer : ${err.message}`);
      });
  };
  return (
    <div>
      <>
        <form
          className="gap-4 d-flex flex-column justify-content-center align-items-center "
          onSubmit={SignUpSub}
        >
          <div>
            <select
              name="date"
              id="date"
              className="inputField text-black"
              onChange={(e) => {
                setDatetime(e.target.value);
              }}
              style={{ width: "20vw" }}
              required
            >
              <option value="">--Select Yoga Class Time--</option>
              <option value="9am to 11am">9am to 11am</option>
              <option value="12pm to 2pm">12pm to 2pm</option>
              <option value="4pm to 6pm">4pm to 6pm</option>
            </select>
          </div>
          <div>
            {/* <label htmlFor="specialization">Specilizions </label> */}
            <select
              name="specialization"
              id="specialization"
              className="inputField text-black"
              onChange={(e) => setSpecialization(e.target.value)}
              style={{ width: "20vw" }}
              required
            >
              <option value="">--Select Yoga Specilization--</option>
              <option value="Hatha Yoga">Hatha Yoga</option>
              <option value="Bikram Yoga">Bikram Yoga</option>
              <option value="Yoga Philosophy">Yoga Philosophy</option>
              <option value="Restorative Yoga">Restorative Yoga</option>
              <option value="Ashtanga Yoga">Ashtanga Yoga</option>
            </select>
          </div>
          <div className="d-flex gap-2 flex-column w-100">
            <label htmlFor="data">Specilized Certificate </label>
            <input
              type="file"
              name="certificate"
              id="certificate"
              placeholder="Certificate"
              className="w-100  inputField text-black"
              onChange={(e) => {
                setCertificate(e.target.files[0]);
              }}
              style={{ width: "20vw" }}
              required
            />
          </div>

          <button className="btn btn-primary  form-control">
            Register
            <i className="fa-solid fa-right-to-bracket px-2"></i>
          </button>
        </form>
      </>
    </div>
  );
};

Form2.propTypes = {
  uid: PropTypes.string.isRequired,
};
export default Form2;
