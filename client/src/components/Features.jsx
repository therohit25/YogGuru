import PropTypes from "prop-types";

const Features = ({ Img, Heading, Content, rotate }) => {
  return (
    <div>
      <div
        className="d-flex flex-column justify-content-center align-items-center bg-dark opacity-75 py-2 h-100 featureCard"
        style={{ background: "cyan" }}
      >
        <div className="w-25">
          <div className="w-100 card-img-top">
            <img
              src={Img}
              className={`w-100 ${rotate ? "man" : ""}`}
              alt=""
              style={{ aspectRatio: "1/1" }}
            />
          </div>
        </div>
        <div className="d-flex flex-column justify-content-center align-items-center text-white">
          <p className="make-semiheading p-2 text-center">{Heading}</p>
          <p className="p-2 text-center">{Content}</p>
        </div>
      </div>
    </div>
  );
};
Features.propTypes = {
  Img: PropTypes.string.isRequired,
  Heading: PropTypes.string.isRequired,
  Content: PropTypes.string.isRequired,
  rotate: PropTypes.bool,
};

export default Features;
