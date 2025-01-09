import axios from "axios";
import { useEffect, useState } from "react";
import Productlist from "../../components/Productlist";
import "../../assets/css/bookappointment.css";
import { SyncLoader } from "react-spinners";
import { useSelector } from "react-redux";

const BookAppoinments = () => {
  const userdetails = useSelector((state) => state.userSlice.value);
  const [trainers, setTrainers] = useState([]);

  const fetchTrainers = async () => {
    try {
      const result = await axios.get(
        "https://yogguru-backend.onrender.com/yoga/getTrainers"
      );

      setTrainers(result.data);
    } catch (error) {
      console.error(
        "Error while Fetching Trainers for appointments : " + error?.message
      );
    }
  };

  const BookAppointment = async (Trainer, AppointmentTime) => {
    try {
      console.log(userdetails);
      if (userdetails?.Mode === "Online") {
        window.location.href = "http://localhost:5173/Room/" + Trainer;
      } else {
        const result = await axios.post(
          "https://yogguru-backend.onrender.com/yoga/bookappointment",
          {
            Trainer: Trainer,
            AppointmentTime: AppointmentTime,
          }
        );
        if (result.data.msg) {
          alert(result.data.msg);
        }
      }
    } catch (error) {
      console.error("Error while booking appointments : ", error?.message);
    }
  };

  useEffect(() => {
    fetchTrainers();
  }, []);

  return (
    <div
      className=" d-flex flex-column align-items-center  p-5 w-100"
      style={{ backgroundColor: "#faeeea", minHeight: "70vh" }}
    >
      <p className="heading text-uppercase">
        <span
          style={{
            paddingBottom: "1%",
            borderBottom: "2px solid rgb(157, 154, 154)",
          }}
        >
          Trainers
        </span>
      </p>
      <div className="row d-flex justify-content-center align-items-center">
        {trainers?.length === 0 ? (
          <SyncLoader color="#36d7b7" />
        ) : (
          <>
            {trainers?.map((trainer) => {
              return (
                <div className="col-md-3 my-2 col-sm-5 col-7" key={trainer._id}>
                  <Productlist
                    navto={`#`}
                    Img={"profimg.png"}
                    PId={trainer.ContactNo}
                    Name={trainer.Name}
                    Id={trainer._id}
                    Description={trainer?.Specialization}
                    YogaTime={trainer?.YogaTime}
                    SpecializationStyles={"fw-bold"}
                    CardColourClass={"BookAppointmentClass"}
                    BookAppointment={BookAppointment}
                  />
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default BookAppoinments;
