/* eslint-disable react/no-unknown-property */
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "../assets/css/order.css";
import { Link } from "react-router-dom";

function OrderCard(props) {
  const [orderdet, setorderdet] = useState(null);

  useEffect(() => {
    setorderdet(props.Products);
  }, []);

  return (
    <div>
      {orderdet?.length === 0 ? (
        <h1>No Orders Till Now!..</h1>
      ) : (
        <div className="container d-flex justify-content-center align-items-center ">
          <div className="card my-3" style={{ maxWidth: "540px" }}>
            <p className="card-header totalPrice text-center">
              Ordered on &nbsp;
              <span className="font-monospace">{props.OrderAt}</span>
            </p>
            {orderdet?.map((order, ind) => {
              return (
                <Link
                  className="nav-link text-decoration-none text-black card-link ordercard"
                  aria-current="page"
                  to={props.navigate && `/Product2/${order.ProductDet._id}`}
                  key={ind}
                >
                  <div className="row w-100">
                    <div className="col-md-4 mt-2">
                      <img
                        src={`http://localhost:3004/images/${order.ProductDet.ProductImg}`}
                        className="img-fluid rounded-start Orderimage"
                        alt="Card title"
                      />
                    </div>

                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">
                          {order.ProductDet.ProductName}
                        </h5>
                        <p className="card-text">
                          {order.ProductDet.ProductDes.slice(0, 80)}...
                        </p>
                        <p className="card-text d-flex flex-column">
                          <small className="text-muted">
                            <i className="fa-solid fa-indian-rupee-sign"></i>
                            &nbsp; <span>{order.ProductDet.ProductPrice}</span>
                          </small>
                          <small align="right">
                            Quanity: &nbsp;
                            <span className="">
                              <i
                                className={`fa-solid fa-${order.Quantity}`}
                              ></i>
                            </span>
                          </small>
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
            <div className="card-footer " align="right">
              Delivary Status :&nbsp;
              <span className="font-monospace">{props?.Status}</span>
            </div>
            <div className="card-footer totalPrice" align="right">
              Total Price:&nbsp;
              <span className="font-monospace">{props.TotalPrice}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
OrderCard.propTypes = {
  Products: PropTypes.array.isRequired,
  OrderAt: PropTypes.string.isRequired,
  navigate: PropTypes.bool,
  Status: PropTypes.string.isRequired,
  TotalPrice: PropTypes.number.isRequired,
};
export default OrderCard;
