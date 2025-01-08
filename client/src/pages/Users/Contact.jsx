import Trainer from "../../assets/T4.jpg";
import "../../assets/css/contact.css";

const Contact = () => {
  const contact_sub = () => {};
  return (
    <div
      className="container-fluid-lg py-3"
      style={{ backgroundColor: "#faeeea" }}
    >
      <p className="text-black text-center text-uppercase py-2 make-heading heading">
        <span
          style={{
            paddingBottom: "1%",
            borderBottom: "2px solid rgb(157, 154, 154)",
          }}
        >
          Contact Us<i className="fa-solid fa-tty px-2"></i>
        </span>
      </p>
      <div className="container d-flex flex-md-row  align-items-center height-contact-100 flex-column p-5">
        <div className="about-content w-100 d-flex flex-column gap-md-3 align-items-center justify-content-center">
          <div className="w-50">
            <img
              src={Trainer}
              alt=""
              className="w-100 rounded-2 mx-auto"
              srcSet=""
            />
          </div>

          <div className="text-center">
            <div>
              <p className="text-primary d-inline-block">YogGuru</p>
              <p className="d-inline-block">Visit Us,</p>
            </div>
            <div className=" d-flex flex-wrap gap-lg-3 gap-sm-1 justify-content-center align-items-center">
              <strong>Address:</strong>
              <p className="m-0">668, Mangalwar Peth, Satara</p>
            </div>
          </div>
        </div>
        <div className="form-content w-100">
          <form className="my-4">
            <div className="contact-form py-4 mx-4">
              <div className="form-group">
                <label
                  className="control-label col-sm-2"
                  htmlFor="fname"
                  name="name"
                >
                  Name:
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="fname"
                    placeholder="Enter Name"
                    name="fname"
                  />
                </div>
              </div>
              <div className="form-group">
                <label
                  className="control-label col-sm-2"
                  htmlFor="email"
                  name="email"
                >
                  Email:
                </label>
                <div className="col-sm-10">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter email"
                    name="email"
                  />
                </div>
              </div>
              <div className="form-group">
                <label
                  className="control-label col-sm-2"
                  htmlFor="subject"
                  name="subject"
                >
                  Subject:
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="lname"
                    placeholder="Enter Subject"
                    name="subject"
                  />
                </div>
              </div>
              <div className="form-group">
                <label
                  className="control-label col-sm-2"
                  htmlFor="comment"
                  name="comment"
                >
                  Comment:
                </label>
                <div className="col-sm-10">
                  <textarea
                    className="form-control"
                    rows="5"
                    id="comment"
                  ></textarea>
                </div>
              </div>
              <div className="form-group my-2">
                <div className="col-sm-offset-2 col-sm-10">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={contact_sub}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
