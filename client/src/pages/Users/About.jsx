import trainer1 from "../../assets/trainer1.jpg";
import trainer2 from "../../assets/trainer2.jpg";
import trainer3 from "../../assets/trainer3.jpg";

const About = () => {
  return (
    <div style={{ backgroundColor: "#faeeea", minHeight: "auto" }}>
      <div className="container py-5 ">
        <p className="py-4 make-heading text-center text-uppercase heading">
          <span
            style={{
              paddingBottom: "1%",
              borderBottom: "2px solid rgb(157, 154, 154)",
            }}
          >
            About Us<i className="fa-regular fa-address-card px-2"></i>
          </span>
        </p>
        <div
          id="carouselExampleCaptions"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src={trainer1}
                className=" d-block w-100 opacity-75"
                alt="..."
              />
              <div className="carousel-caption d-none d-md-block p-5">
                <h5 className=" make-heading text-dark text-uppercase ">
                  Our Classes teaches everyone equally with full enterntainment.
                </h5>
              </div>
            </div>
            <div className="carousel-item">
              <img
                src={trainer2}
                className="d-block w-100 opacity-75"
                alt="..."
              />

              <div className="carousel-caption d-none d-md-block p-5">
                <h5 className=" make-heading text-dark text-uppercase ">
                  Our Classes teaches everyone equally with full enterntainment.
                </h5>
              </div>
            </div>
            <div className="carousel-item">
              <img
                src={trainer3}
                className="d-block w-100 opacity-75"
                alt="..."
              />
              <div className="carousel-caption d-none d-md-block p-5">
                <h5 className=" make-heading text-dark text-uppercase ">
                  Our Classes teaches everyone equally with full enterntainment.
                </h5>
              </div>
            </div>
          </div>

          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>

        <div className="d-flex container flex-column justify-content-center align-items-center py-2 gap-3">
          <div className="text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
            omnis voluptatem veniam quas, saepe soluta non dignissimos esse est
            a temporibus recusandae dolorum eum accusantium eveniet eius sit
            atque perferendis. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Repellat omnis voluptatem veniam quas, saepe
            soluta non dignissimos esse est a temporibus recusandae dolorum eum
            accusantium eveniet eius sit atque perferendis. Lorem ipsum dolor
            sit amet consectetur adipisicing elit. Repellat omnis voluptatem
            veniam quas, saepe soluta non dignissimos esse est a temporibus
            recusandae dolorum eum accusantium eveniet eius sit atque
            perferendis.
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
