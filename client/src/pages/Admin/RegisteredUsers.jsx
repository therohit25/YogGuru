import axios from "axios";
import { useEffect, useState } from "react";
import Table from "../../components/Table";

const RegisteredUsers = () => {
  const [userData, setUserdata] = useState(null);
  const [dateData, setDatedata] = useState();
  const [role, setRole] = useState(null);
  const [date, setDate] = useState(null);

  const [filteredData, setFiltereddata] = useState(null);

  const FetchUserData = async () => {
    try {
      const result = await axios.get(
        "https://yogguru-backend.onrender.com/admin/getAllusers"
      );

      setUserdata(result.data);
      setDatedata([
        ...new Set(result.data.map((item) => item?.RegTime.slice(0, 10))),
      ]);

      setFiltereddata(result.data);
    } catch (error) {
      console.error(
        `Error while fetching All Registered Users: {error?.message}`
      );
    }
  };

  const FilterData = () => {
    let filterResult = [];
    if (userData) {
      filterResult = [...userData];
    } else {
      return;
    }
    if (role) {
      filterResult = filterResult?.filter((user) => user.Role === role);
    }

    if (date) {
      filterResult = filterResult?.filter(
        (item) => item?.RegTime.slice(0, 10) === date
      );
    }

    setFiltereddata(filterResult);
  };

  const DeleteUser = async (UserId) => {
    try {
      await axios.delete(
        "https://yogguru-backend.onrender.com/admin/removeUser",
        {
          data: { UserId: UserId },
        }
      );

      FetchUserData();
    } catch (error) {
      console.error(`Error in Deleting User : ${error?.message}`);
    }
  };

  useEffect(() => {
    FetchUserData();
  }, []);
  useEffect(() => {
    FilterData();
  }, [role, date]);

  return (
    <div>
      <div className="p-5 d-flex gap-2 w-75">
        <div className="w-100">
          <select
            className="form-control form-select "
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="" selected>
              --Select Role--
            </option>
            <option value="Trainee">Trainee</option>
            <option value="Trainer">Trainer</option>
          </select>
        </div>
        <div className="w-100">
          <select
            className="form-control form-select "
            onChange={(e) => setDate(e.target.value)}
          >
            <option value="" selected>
              --Select Date--
            </option>
            {dateData?.map((item, ind) => {
              return (
                <option value={item} key={ind}>
                  {item}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <Table
        userData={filteredData}
        Header="Registered Users"
        Remove={DeleteUser}
        imgUrl={"certificates"}
      />
    </div>
  );
};

export default RegisteredUsers;
