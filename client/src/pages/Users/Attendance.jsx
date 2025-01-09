import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
const Attendance = () => {
  const { Trainee } = useParams();
  useEffect(() => {
    (async () => {
      await axios.get(
        `https://yogguru-backend.onrender.com/yoga/updateattendanceWithQR/${Trainee}`
      );
      alert("Attedance Noted Successfully");
    })();
  }, []);
};

export default Attendance;
