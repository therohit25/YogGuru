import { Link, useLocation } from "react-router-dom";
import Orders from "./Orders";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import axios from "axios";
import { login } from "../../features/LoginLogout/LoginLogout";
import QRCodeGenerator from "./QRCodeGenerator";

const Profile = () => {
  let path = useLocation();
  path = path.pathname.toLowerCase();
  const userdetails = useSelector((state) => state.userSlice.value);
  const [enableedit, setEnableEdit] = useState(false);
  const [userinfo, setUserInfo] = useState(false);

  const dispatch = useDispatch();

  const updateinfo = (e) => {
    setUserInfo({
      ...userinfo,
      [e.target.name]: e.target.value,
    });
  };

  const EnableEdit = () => {
    if (enableedit) {
      //Update Personal Info Code
      try {
        axios.put(
          "https://yogguru-backend.onrender.com/user/updateProfile",
          userinfo
        );
        dispatch(login(userinfo));
      } catch (e) {
        console.error(`Error in Upading User Profile : ${e?.message}`);
      }
    }
    setEnableEdit(!enableedit);
  };

  useEffect(() => {
    setUserInfo(userdetails);
  }, []);

  return (
    <div
      className="d-flex justify-content-center align-items-center py-5"
      style={{ backgroundColor: "#faeeea", minHeight: "70vh" }}
    >
      <div className="card text-center w-50">
        <div className="card-header">
          <ul className="nav nav-tabs card-header-tabs">
            <li className="nav-item">
              <Link
                to="/Profile"
                className={`nav-link ${path === "/profile" ? "active" : ""}`}
                aria-current="true"
              >
                Personal Info<i className="fa-solid fa-user px-2"></i>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/orderhist"
                className={`nav-link ${path === "/orderhist" ? "active" : ""}`}
              >
                Order Histry<i className="fa-solid fa-bag-shopping px-2"></i>
              </Link>
            </li>
          </ul>
        </div>
        <div className="card-body ">
          {path === "/profile" && (
            <div
              className="d-flex align-items-center"
              style={{ maxHeight: "40vh", width: "100%", overflowX: "scroll" }}
            >
              <div className="d-flex flex-column gap-5 w-100">
                <div className="prof-img w-100">
                  {userdetails?.Role === "Trainer" ? (
                    <>
                      <img
                        src={`https://yogguru-backend.onrender.com/images/profimg.png`}
                        alt=""
                        style={{ aspectRatio: 1 / 1 }}
                        className="w-25 rounded-5"
                      />
                    </>
                  ) : (
                    // eslint-disable-next-line react/no-unknown-property
                    <div align="center" className="w-100">
                      <QRCodeGenerator
                        url={`http://localhost:5173/Attendance/${userdetails?._id}`}
                      />
                    </div>
                  )}
                </div>
                <div className="d-flex gap-2 justify-content-center">
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={EnableEdit}
                  >
                    {enableedit ? "Update Data" : "Edit Data"}
                  </button>
                </div>
              </div>
              <div className="w-100">
                <div className="personal-info d-flex flex-column align-items-center justify-content-center gap-2">
                  <div>
                    <div className="d-flex gap-2">
                      <strong>Name:</strong>
                      <input
                        type="text"
                        disabled={enableedit ? false : true}
                        className="form-control "
                        onChange={updateinfo}
                        name="Name"
                        value={userinfo?.Name}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="d-flex gap-2">
                      <strong>Email:</strong>
                      <input
                        type="text"
                        disabled={enableedit ? false : true}
                        className="form-control"
                        value={userinfo?.Email}
                        onChange={updateinfo}
                        name="Email"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="d-flex gap-2">
                      <strong>Address:</strong>
                      <input
                        type="text"
                        disabled={enableedit ? false : true}
                        className="form-control"
                        value={userinfo?.Address}
                        onChange={updateinfo}
                        name="Address"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="d-flex gap-2">
                      <strong>ContactNo:</strong>
                      <input
                        type="text"
                        disabled={enableedit ? false : true}
                        className="form-control"
                        value={userinfo?.ContactNo}
                        onChange={updateinfo}
                        name="ContactNo"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="d-flex gap-2">
                      <strong>Role:</strong>
                      <input
                        type="text"
                        disabled={enableedit ? false : true}
                        className="form-control"
                        value={userinfo?.Role}
                        onChange={updateinfo}
                        name="Role"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {path === "/orderhist" && (
            <div className="w-100">
              <Orders />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
