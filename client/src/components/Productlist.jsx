import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Productlist = (props) => {
  return (
    <div>
      <Link
        className="nav-link text-decoration-none text-black card-link "
        aria-current="page"
        to={props.navto}
      >
        <div
          key={props.Id}
          // key={props.proddet.ProductId}
          className={`card  d-flex flex-column justify-content-center align-props.proddets-center  product-info p-3 ${
            props?.CardColourClass && props?.CardColourClass
          }`}
        >
          <div className="w-100 card-img-top">
            <img
              src={`http://localhost:3004/images/${props.Img}`}
              // src={`http://localhost:3004/images/${props.proddet.ProductImg}`}
              alt=""
              srcSet=""
              className="w-100 rounded "
              style={{ aspectRatio: "1" }}
            />
          </div>
          <div className="card-body">
            <p className="make-semiheading  text-center heading">
              {props.Name}
            </p>

            <p
              className={`card-subtitle ${
                props?.SpecializationStyles && props?.SpecializationStyles
              }`}
            >
              {props?.SpecializationStyles ? (
                <>
                  <li>
                    {props?.Description &&
                      `${props.Description.slice(0, 80)}...`}
                  </li>
                </>
              ) : (
                <span>
                  {props?.Description && `${props.Description.slice(0, 80)}...`}
                </span>
              )}
            </p>
            {props.Price ? (
              <div className="d-flex gap-1 w-100 flex-wrap">
                <p className="make-semiheading">Rs.{props.Price}</p>
                <strike className="text-success">Rs.350</strike>
              </div>
            ) : (
              <>
                <div className="d-flex gap-1 w-100 flex-wrap">
                  <p className="make-semiheading overflow">
                    Time: {props.YogaTime}
                  </p>
                </div>
                <div className="w-100">
                  <button
                    className="btn btn-primary w-100"
                    onClick={() =>
                      props.BookAppointment(props.Id, props.YogaTime)
                    }
                  >
                    Book Class
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};
Productlist.propTypes = {
  navto: PropTypes.string.isRequired,
  Id: PropTypes.string.isRequired,
  CardColourClass: PropTypes.string,
  Img: PropTypes.string.isRequired,
  Name: PropTypes.string.isRequired,
  SpecializationStyles: PropTypes.string,
  Description: PropTypes.string,
  Price: PropTypes.number,
  YogaTime: PropTypes.string,
  BookAppointment: PropTypes.func.isRequired,
};

export default Productlist;
