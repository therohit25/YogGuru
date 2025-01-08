import YogaHome from "../../assets/yogahome.png";
import YogaService from "../../assets/yogaservice.png";
import YogaPhone from "../../assets/yogaphone.png";
import YogaCart from "../../assets/yogacart.png";
import { Link } from "react-router-dom";
import "../../assets/css/home.css";
import Features from "../../Components/Features";

function Home() {
  return (
    <div className="container-fluid-lg">
      <div className="container-fluid-lg">
        <div className="height100 container-fluid-lg text-white d-flex justify-content-between align-items-center">
          <div className="d-flex justify-content-center align-items-center w-sm-50 h-100 px-3 ">
            <div className="d-flex flex-column gap-md-3 align-items-center justify-content-center">
              <p className="text-info font-size-4 heading">
                HEALTH IS WEALTH
                <i className="fa-solid fa-person-walking px-3 "></i>
              </p>
              <p className="text-center p-md-1">
                Book your yoga class according to your schedule,Attend Live
                class from Anywhere,Buy yoga products with worthy discounts.
              </p>
              <Link to="/Register">
                <button className="btn btn-info">
                  Join Us<i className="fa-solid fa-right-to-bracket px-2"></i>
                </button>
              </Link>
            </div>
          </div>
          <div className="w-sm-100">
            <img src={YogaHome} className="w-100" alt="" srcSet="" />
          </div>
        </div>
      </div>

      <div className="conatiner-fluid-lg">
        <div className="conatiner-fluid-lg d-flex flex-column flex-sm-row w-100">
          <Features
            Img={YogaPhone}
            Content="Take classes at your own pace, on your own time, and on any device."
            Heading="Everywhere With You "
          />
          <Features
            Img={YogaService}
            Content=" Yoga Manages Human Health, Includes a special skill of Meditation."
            Heading="Join Class with Us"
            rotate={"man"}
          />

          <Features
            Img={YogaCart}
            Content="Buy Quality, Necessary Yoga products with huge discounts."
            Heading="Shop Yoga Accessories"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
