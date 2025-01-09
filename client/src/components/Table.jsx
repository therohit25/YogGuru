import { SyncLoader } from "react-spinners";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Table = ({
  userData,
  Header,
  Remove,
  others,
  UpdateStatus,
  imgUrl,
  Quantity,
  UpdateQuantity,
  ViewBtn,
}) => {
  if (!userData) {
    return (
      <div className="d-flex justify-content-center ">
        <SyncLoader color="#36d7b7" />
      </div>
    );
  }

  return (
    <>
      {userData?.length === 0 ? (
        <>
          <p className="heading mx-5">No Data Found</p>
        </>
      ) : (
        <div style={{ background: "rgb(250, 238, 234)" }}>
          <hr />
          <div className="right-panel w-100 ">
            <div className="right-panel-box px-5">
              <form action="">
                <div className="mb-3">
                  <label
                    htmlFor=""
                    className="form-label  heading"
                    style={{
                      paddingBottom: "1%",
                      borderBottom: "2px solid rgb(157, 154, 154)",
                    }}
                  >
                    {Header}:
                  </label>
                </div>
              </form>
              <div className="container-fluid bg-transparent py-3">
                <table className="table w-100 table-bordered table-hover table-responsive table-striped table-bg-dark">
                  <thead>
                    <tr className="table-dark opacity-75">
                      {userData &&
                        Object?.keys(userData[0])?.map((column, ind) => {
                          return (
                            ind !== 0 && (
                              <th scope="col" className="p-1" key={ind}>
                                {column}
                              </th>
                            )
                          );
                        })}
                      {ViewBtn && (
                        <th scope="col" className="p-1">
                          View
                        </th>
                      )}
                      <th scope="col" className="p-1">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {userData?.map((user, ind) => {
                      return (
                        <tr key={ind}>
                          {Object?.values(user)?.map((data, ind) => {
                            return (
                              <>
                                {ind !== 0 &&
                                  (data === "Pending" ||
                                  data === "Delivered" ||
                                  data === "Dispatched" ? (
                                    <td scope="row" key={ind}>
                                      <select
                                        name="status"
                                        id="status"
                                        className="form-control"
                                        onChange={(e) =>
                                          UpdateStatus(e.target.value, user._id)
                                        }
                                      >
                                        {others?.map((other, ind) => {
                                          return other === data ? (
                                            <option
                                              value={other}
                                              key={ind}
                                              selected
                                            >
                                              {other}
                                            </option>
                                          ) : (
                                            <option value={other} key={ind}>
                                              {other}
                                            </option>
                                          );
                                        })}
                                      </select>
                                    </td>
                                  ) : (
                                    <td scope="row" key={ind}>
                                      {typeof data === "string" ? (
                                        data.endsWith(".png") ||
                                        data.endsWith(".jpg") ||
                                        data.endsWith(".jpeg") ? (
                                          <div className="w-100">
                                            <img
                                              style={{ aspectRatio: "1/1" }}
                                              className="w-100"
                                              src={`https://yogguru-backend.onrender.com/${imgUrl}/${data}`}
                                              alt={data}
                                            />
                                          </div>
                                        ) : data.length > 50 ? (
                                          `${data.slice(0, 50)}...`
                                        ) : (
                                          data
                                        )
                                      ) : (
                                        <>
                                          {Quantity && ind === 5 ? (
                                            <>
                                              <input
                                                type="number"
                                                value={data}
                                                onChange={(e) =>
                                                  UpdateQuantity(
                                                    e.target.value,
                                                    user._id
                                                  )
                                                }
                                              />
                                            </>
                                          ) : (
                                            data
                                          )}
                                        </>
                                      )}
                                    </td>
                                  ))}
                              </>
                            );
                          })}
                          {ViewBtn && (
                            <td scope="row">
                              <Link to={`/admin/parorder/${user._id}`}>
                                <button className="btn btn-danger">View</button>
                              </Link>
                            </td>
                          )}
                          <td scope="row">
                            <button
                              className="btn btn-danger"
                              onClick={() => Remove(user._id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
Table.propTypes = {
  userData: PropTypes.array.isRequired,
  Header: PropTypes.string,
  Remove: PropTypes.func.isRequired,
  others: PropTypes.array,
  UpdateStatus: PropTypes.func,
  imgUrl: PropTypes.string,
  Quantity: PropTypes.bool,
  UpdateQuantity: PropTypes.func,
  ViewBtn: PropTypes.bool,
};

export default Table;
