import PropTypes from "prop-types";

const ClassCard = ({
  UpdateAttendance,
  item,
  userdetails,
  appointmentTime = null,
  id,
}) => {
  return (
    <div className="card " style={{ width: "30vw" }}>
      <div className="card-header">
        {userdetails?.Role === "Trainee" ? item?.Name : item?.Name}
      </div>
      <div className="card-body">
        <div className="d-flex">
          <div className="w-100">
            <img
              src="http://localhost:3004/images/profimg.png"
              alt=""
              className="card-img-top"
            />
          </div>
          <div>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. ?</p>
            <div className="d-flex gap-3">
              <button
                className="btn btn-info"
                onClick={() => UpdateAttendance("Present", item._id, id)}
              >
                Present✔️
              </button>
              <button
                className="btn btn-warning"
                onClick={() => UpdateAttendance("Absent", item._id, id)}
              >
                Absent❌
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="card-footer">{appointmentTime}</div>
    </div>
  );
};
ClassCard.propTypes = {
  UpdateAttendance: PropTypes.func.isRequired,
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Name: PropTypes.string.isRequired,
  }).isRequired,
  userdetails: PropTypes.shape({
    Role: PropTypes.string.isRequired,
  }).isRequired,
  appointmentTime: PropTypes.string,
  id: PropTypes.string.isRequired,
};

export default ClassCard;
