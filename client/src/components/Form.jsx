import { useState } from "react";
import axios from "axios";
import Form2 from "./Form2";
import { toast } from "react-toastify";
const Form = () => {
  let regname = /^[a-zA-Z]+ [a-zA-Z]+$/;
  let regemail = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

  var regpass =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [role, setRole] = useState("");
  const [mode, setMode] = useState("");
  const [nameerror, setNameerror] = useState("");
  const [emailerror, setEmailerror] = useState("");

  const [contacterror, setContacterror] = useState("");
  const [passworderror, setPassworderror] = useState("");
  const [cpassworderror, setCpassworderror] = useState("");

  const [nextForm, setNextForm] = useState(false);

  const [uid, setUid] = useState(null);

  const SignUpSub = (e) => {
    e.preventDefault();

    if (
      nameerror ||
      emailerror ||
      contacterror ||
      passworderror ||
      cpassworderror
    ) {
      return false;
    }

    const body = {
      name: name,
      email: email,
      address: address,
      password: password,
      contactno: contact,
      role: role,
    };
    if (mode?.trim() !== "") {
      body.mode = mode;
    }
    axios
      .post("https://yogguru-backend.onrender.com/register", body)
      .then((res) => {
        if (role === "Trainer") {
          setUid(res.data.uid);
          setNextForm(true);
        } else {
          toast(" Registered Successfully Form..!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }

        setName("");
        setAddress("");
        setRole("");
        setMode("");

        setEmail("");
        setPassword("");
        setContact("");
      })
      .catch((err) => console.error("Error While Signing Up : ", err.message));
  };
  return (
    <div>
      {nextForm ? (
        <Form2 uid={uid} />
      ) : (
        <form
          className="gap-4 d-flex flex-column justify-content-center align-items-center "
          onSubmit={SignUpSub}
        >
          <div className="d-flex flex-column position-relative">
            <input
              type="text"
              name="name"
              id="Name"
              placeholder="Enter Name"
              className="inputField text-black"
              onChange={(e) => {
                setName(e.target.value);
                setNameerror(!e.target.value.match(regname));
              }}
              required
              style={{ width: "20vw" }}
            />
            {name !== "" && nameerror && (
              <small
                className=" mt-2"
                style={{
                  position: "relative",
                  bottom: "0px",
                  padding: "4%",
                  background: "red",
                  color: "white",
                  borderRadius: "50px",
                  textTransform: "capitalize",
                  paddingLeft: "5%",
                }}
              >
                Name is Not Invalid
                <span className="px-2">
                  <i className="fa-solid fa-circle-exclamation"></i>
                </span>
              </small>
            )}
          </div>
          <div className="d-flex flex-column">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter Email"
              className="inputField text-black"
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailerror(!email.match(regemail));
              }}
              required
              style={{ width: "20vw" }}
            />
            {email !== "" && emailerror && (
              <small
                className=" mt-2"
                style={{
                  position: "relative",
                  bottom: "0px",
                  padding: "4%",
                  background: "red",
                  color: "white",
                  borderRadius: "50px",
                  textTransform: "capitalize",
                  paddingLeft: "5%",
                }}
              >
                Email is Not Invalid
                <span className="px-2">
                  <i className="fa-solid fa-circle-exclamation"></i>
                </span>
              </small>
            )}
          </div>
          <div className="d-flex flex-column">
            <input
              type="text"
              name="address"
              id="address"
              placeholder="Enter Address"
              className="inputField text-black"
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              required
              style={{ width: "20vw" }}
            />
          </div>
          <div className="d-flex flex-column w-auto">
            <input
              type="number"
              name="contactno"
              id="contactno"
              placeholder="Enter contactno"
              className="inputField text-black"
              onChange={(e) => {
                setContact(e.target.value);
                setContacterror(e.target.value.length !== 10);
              }}
              style={{ width: "20vw" }}
              required
            />
            {contact !== "" && contacterror && (
              <small
                className=" mt-2"
                style={{
                  position: "relative",
                  bottom: "0px",
                  padding: "4%",
                  background: "red",
                  color: "white",
                  left: "0px",

                  borderRadius: "50px",
                  textTransform: "capitalize",
                  paddingLeft: "5%",
                }}
              >
                No. is Not Invalid
                <span className="px-2">
                  <i className="fa-solid fa-circle-exclamation"></i>
                </span>
              </small>
            )}
          </div>
          <div className="d-flex flex-column">
            <input
              type="password"
              name="password"
              id="password"
              placeholder="8-10 characters"
              className="inputField text-black"
              onChange={(e) => {
                setPassword(e.target.value);
                setPassworderror(!e.target.value.match(regpass));
              }}
              required
              style={{ width: "20vw" }}
            />
            {password !== "" && passworderror && (
              <small
                className=" mt-2"
                style={{
                  position: "relative",
                  bottom: "0px",
                  padding: "4%",
                  background: "red",
                  color: "white",
                  borderRadius: "50px",
                  paddingLeft: "5px",
                  textTransform: "capitalize",
                }}
              >
                8 Chars,1 Caps,Symbol,No.
                <span className="px-2">
                  <i className="fa-solid fa-circle-exclamation"></i>
                </span>
              </small>
            )}
          </div>
          <div className="d-flex flex-column">
            <input
              type="password"
              name="cpassword"
              id="cpassword"
              placeholder="Confirm Password"
              className="inputField text-black "
              onChange={(e) => {
                setCpassword(e.target.value);
                setCpassworderror(password !== e.target.value);
              }}
              required
              style={{ width: "20vw" }}
            />
            {cpassword !== "" && cpassworderror && (
              <small
                className=" mt-2"
                style={{
                  position: "relative",
                  bottom: "0px",
                  padding: "4%",
                  background: "red",
                  color: "white",
                  borderRadius: "50px",
                  textTransform: "capitalize",
                  paddingLeft: "5%",
                }}
              >
                Password Not Matched
                <span className="px-2">
                  <i className="fa-solid fa-circle-exclamation"></i>
                </span>
              </small>
            )}
          </div>
          <select
            name="role"
            id="role"
            required
            style={{ width: "20vw" }}
            onChange={(e) => setRole(e.target.value)}
            className="inputField text-black "
          >
            Role
            <option value="" disabled selected>
              --Select Role--
            </option>
            <option value="Trainee">Trainee</option>
            <option value="Trainer">Trainer</option>
          </select>
          {role !== "Trainer" && (
            <select
              name="mode"
              id="mode"
              required
              style={{ width: "20vw" }}
              onChange={(e) => setMode(e.target.value)}
              className="inputField text-black "
            >
              Mode
              <option value="" disabled selected>
                --Select Mode--
              </option>
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
            </select>
          )}

          <button className="btn btn-primary  form-control">
            {role !== "Trainer" ? (
              <>
                Register
                <i className="fa-solid fa-right-to-bracket px-2"></i>
              </>
            ) : (
              <>
                Next<i className="fa-solid fa-right-to-bracket px-2"></i>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default Form;
