import { useEffect } from "react";
import Table from "../../Components/Table";
import axios from "axios";
import { useState } from "react";

const Bookings = () => {
  const [bookingData, setBookingData] = useState(null);
  const [filtereddata, setFilteredData] = useState(null);
  const [datedata, setDatedata] = useState(null);
  const [date, setDate] = useState(null);
  const FetchBookings = async () => {
    try {
      const result = await axios.get("http://localhost:3004/yoga/getbookings");

      let appointments = result?.data?.map((appointment) => {
        return appointment?.Trainee?.map((trainee) => {
          return {
            ...appointment,
            ["Trainee"]: trainee?.TraineeInfo?.Name,
            ["Trainer"]: appointment.Trainer.Name,
          };
        });
      });

      setDatedata([
        ...new Set(appointments?.map((appointment) => appointment[0]?.Today)),
      ]);

      const filteredBookings = appointments.reduce((acc, appointment) => {
        return (acc = [...acc, ...appointment]);
      });
      setBookingData(filteredBookings);
      setFilteredData(filteredBookings);
    } catch (error) {
      console.error("Error while Fetching Booking " + error?.message);
    }
  };

  const FilterData = () => {
    let filterResult = [];
    if (bookingData) {
      filterResult = [...bookingData];
    }

    if (date) {
      filterResult = filterResult?.filter((item) => item?.Today === date);
    }
    setFilteredData(filterResult);
  };
  const DeleteBooking = () => {};
  useEffect(() => {
    FetchBookings();
  }, []);
  useEffect(() => {
    FilterData();
  }, [date]);
  return (
    <div>
      <div className="d-flex flex-column gap-5">
        <div className="w-75 p-5">
          <select
            name="booking"
            id="booking"
            className="form-control form-select "
            onChange={(e) => setDate(e.target.value)}
            defaultValue=""
          >
            <option value="" disabled>
              --Select Date--
            </option>
            {datedata?.map((item, ind) => (
              <option value={item} key={ind}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <Table
          userData={filtereddata}
          Header="Appointments"
          Remove={DeleteBooking}
        />
      </div>
    </div>
  );
};

export default Bookings;
