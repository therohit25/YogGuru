import axios from "axios";
import ClassCard from "../../components/ClassCard";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Appointments } from "../../features/YogaAppointment/Appointment";

const ViewAppoinments = () => {
  const dispatch = useDispatch();

  const [active, setActive] = useState("Due");
  const userdetails = useSelector((state) => state.userSlice.value);
  const appointments = useSelector((state) => state.appointmentSlice.value);
  const [traineeInfo, setTraineeInfo] = useState([]);

  const UpdateAttendance = async (attendance, _id, id) => {
    try {
      await axios.put(
        "https://yogguru-backend.onrender.com/yoga/updateattendance",
        {
          attendance: attendance,
          _id: _id,
          id: id,
        }
      );

      toast("Attendance changed to " + attendance, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      FetchAppointments();
    } catch (error) {
      console.error("Attendance Update error " + error?.message);
    }
  };

  const FilterByAttendance = (filter, appointmentList = appointments) => {
    setActive(filter);
    setTraineeInfo(
      appointmentList[0]?.Trainee?.filter(
        (trainee) => trainee.Attendance === filter
      )
    );
  };

  const FetchAppointments = async () => {
    try {
      let result = "";
      if (userdetails?.Role === "Trainee") {
        result = await axios.get(
          "https://yogguru-backend.onrender.com/yoga/getappointments"
        );
      } else {
        result = await axios.get(
          "https://yogguru-backend.onrender.com/yoga/getappointmentsTrainer"
        );
      }

      dispatch(Appointments(result?.data));
      FilterByAttendance("Due", result?.data);
    } catch (error) {
      console.error(
        `Error in Fetching Appoints of particular Trainer : ${error}`
      );
    }
  };
  useEffect(() => {
    FetchAppointments();
  }, []);
  return (
    <div
      className="d-flex justify-content-center my-2"
      style={{ backgroundColor: "#faeeea", minHeight: "70vh" }}
    >
      <div className="container">
        <div className="my-5 d-flex gap-2">
          <button
            className={`btn  rounded-5 px-3 py-1 ${
              active === "Due" ? "btn-success" : "btn-info"
            }`}
            onClick={() => FilterByAttendance("Due")}
          >
            Due
          </button>
          <button
            className={`btn  rounded-5 px-3 py-1 ${
              active === "Present" ? "btn-success" : "btn-info"
            }`}
            onClick={() => FilterByAttendance("Present")}
          >
            Present
          </button>
          <button
            className={`btn  rounded-5 px-3 py-1 ${
              active === "Absent" ? "btn-success" : "btn-info"
            }`}
            onClick={() => FilterByAttendance("Absent")}
          >
            Absent
          </button>
        </div>
        <div className="d-flex flex-wrap gap-3">
          {appointments?.length > 0 ? (
            <>
              {userdetails?.Role !== "Trainer" ? (
                <ClassCard
                  userdetails={userdetails}
                  appointments={appointments}
                  UpdateAttendance={UpdateAttendance}
                />
              ) : (
                <>
                  {traineeInfo?.length > 0 ? (
                    traineeInfo?.map((trainee, ind) => {
                      return (
                        <>
                          <ClassCard
                            userdetails={userdetails}
                            item={trainee.TraineeInfo}
                            UpdateAttendance={UpdateAttendance}
                            key={ind}
                            appointmentTime={appointments[0].AppointmentTime}
                            id={appointments[0]._id}
                          />
                        </>
                      );
                    })
                  ) : (
                    <p
                      className="heading text-center w-100 "
                      style={{ height: "40vh" }}
                    >
                      No Active {active} Trainees
                    </p>
                  )}
                </>
              )}
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
            </>
          ) : (
            <>
              <p className="heading text-center w-100">
                Attendance Is Completed
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewAppoinments;
