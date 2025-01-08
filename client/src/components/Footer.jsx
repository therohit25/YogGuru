import { Link } from "react-router-dom";
import "../assets/css/footer.css";
function Footer() {
  return (
    <div>
      <footer className="footer-start">
        <div className="footer-end flex-lg-row flex-column">
          <div className="d-flex flex-column gap-2 justify-content-center align-items-center p-5 flex-2">
            <p className="heading text-uppercase">YogGuru🧘‍♀️</p>
            <div>
              YogGuru is a platform, from where you can book online classes and
              attend classes at your time and place.You can also buy yoga
              accessaries from YogGuru.
            </div>
          </div>
          <div id="q-links">
            <h3>Quick Links</h3>
            <ul className="p-0">
              <li>
                <Link className="nav-link" aria-current="page" to="/Product1">
                  Products
                </Link>
              </li>
              <li>
                <Link className="nav-link" aria-current="page" to="/About">
                  About
                </Link>
              </li>
              <li>
                {" "}
                <Link className="nav-link" aria-current="page" to="/Contact">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div id="address" className="text-center">
            <h3>Address</h3>
            <p>
              2303, Brown Bear Drive,
              <br />
              London
            </p>
          </div>
          <div className="d-flex flex-column gap-3 w-100 align-items-center">
            <h3>Follow Us</h3>
            <div className="flex-img">
              <i
                className="fa-brands fa-facebook "
                style={{ fontSize: "2rem" }}
              ></i>
              <i
                className="fab fa-instagram fa-fw "
                style={{ fontSize: "2rem" }}
              ></i>
              <i
                className="fab fa-linkedin fa-fw l"
                style={{ fontSize: "2rem" }}
              ></i>
              <i
                className="fab fa-twitter fa-fw "
                style={{ fontSize: "2rem" }}
              ></i>
            </div>
          </div>
        </div>
        <div id="cp-right" className="sticky-bottom ">
          <p className="heading">&copy; All reserved To YogGuru🧘‍♀️....</p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
