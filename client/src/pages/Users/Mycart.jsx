import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../assets/css/mycart.css";
import {
  FinalPrice,
  emptyCart,
  getCart,
  removeFromCart,
  updateFromCart,
} from "../../features/Cart/Cart";

import { loadStripe } from "@stripe/stripe-js";
import { SyncLoader } from "react-spinners";

const Mycart = () => {
  const userdetails = useSelector((state) => state.userSlice.value);

  const dispatch = useDispatch();
  const { cart, loading, TotalPrice } = useSelector((state) => state.cartSlice);

  const makePayment = async () => {
    try {
      await loadStripe(import.meta.env.VITE_STRIPE_PAYMENT_URL);

      const session = await axios.post(
        "https://yogguru-backend.onrender.com/user/OnlineOrder",
        {
          cart,
        }
      );

      window.location.href = session.data.url;
    } catch (err) {
      console.error(`Error in Making Payment : ${err?.message}`);
    }
  };

  const fetchpro = () => {
    if (cart?.length > 0) {
      dispatch(FinalPrice());
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getCart());
      } catch (error) {
        console.error("Error fetching Cart data : ", error);
      }
    };
    fetchData();
  }, []);

  const emptycart = () => {
    dispatch(emptyCart());
    dispatch(FinalPrice());
  };

  const UpdateQuantity = (ProductId, val) => {
    dispatch(
      updateFromCart({
        ProductId: ProductId,
        Quantity: val,
      })
    );
  };

  const Remove = (ProductId) => {
    dispatch(removeFromCart(ProductId));
  };

  useEffect(() => {
    fetchpro();
  }, [cart]);

  if (loading) {
    return (
      <>
        <div
          style={{ backgroundColor: "#faeeea", minHeight: "70vh" }}
          className="py-5"
        >
          <p className="make-heading text-center text-uppercase heading">
            <span
              style={{
                paddingBottom: "1%",
                borderBottom: "2px solid rgb(157, 154, 154)",
              }}
            >
              My Cart <i className="fa-solid fa-cart-shopping px-2"></i>
            </span>
          </p>
          <div
            style={{ height: "40vh" }}
            className="d-flex align-items-center justify-content-center"
          >
            <SyncLoader color="#36d7b7" />
          </div>
        </div>
      </>
    );
  }

  return (
    <div
      style={{ backgroundColor: "#faeeea", minHeight: "70vh" }}
      className="py-5"
    >
      <p className="make-heading text-center text-uppercase heading position-sticky top-0">
        <span
          style={{
            paddingBottom: "1%",
            borderBottom: "2px solid rgb(157, 154, 154)",
          }}
        >
          My Cart <i className="fa-solid fa-cart-shopping px-2"></i>
        </span>
      </p>
      <div
        className="container  py-5 d-flex w-100 flex-lg-row justify-content-between  flex-column align-items-md-start align-items-center justify-content-center gap-5 "
        style={{ flex: 3 }}
      >
        <div className="container d-flex flex-column gap-4 w-100 ">
          <div className="profinfo d-flex flex-column cardbg p-3 w-100">
            <p className="make-semiheading">Deliver to: {userdetails?.Name} </p>

            <p className="make-semiheading">
              Contact: {userdetails?.ContactNo}
            </p>
            <p className="make-semiheading">Address: {userdetails?.Address}</p>
          </div>

          {cart?.length > 0 ? (
            cart.map((item) => {
              return (
                <div
                  className="d-flex flex-column gap-3 cardbg p-3 w-sm-100"
                  key={item?.ProductDet?._id}
                >
                  <div className="d-flex flex-column  flex-sm-row gap-sm-3 align-items-center w-100 ">
                    <div className="w-100 prodimgwidth">
                      <img
                        src={`https://yogguru-backend.onrender.com/images/${item?.ProductDet?.ProductImg}`}
                        className="w-100 rounded-3"
                        alt=""
                        srcSet=""
                      />
                    </div>
                    <div className="d-flex flex-column align-items-center align-items-md-start  w-100 p-2 ">
                      <p className="heading ">
                        {item?.ProductDet?.ProductName}
                      </p>
                      <p className="font-monospcae ">
                        {item?.ProductDet?.ProductDes}
                      </p>
                      <div className="d-flex flex-sm-row flex-column justify-content-between gap-2">
                        <div className="para-font w-100 d-flex gap-2">
                          <p className="w-100">Delivery By Thur </p>

                          <p className="w-100">
                            |Free <strike> Rs.100</strike>
                          </p>
                        </div>
                      </div>
                      <div className="d-flex gap-1 w-100 flex-wrap">
                        <p className="make-semiheading">
                          Rs.{item?.ProductDet?.ProductPrice}
                        </p>
                        <strike className="text-success">
                          Rs.{item?.ProductDet?.ProductPrice + 200}
                        </strike>
                        <p className="text-success">10% off</p>
                      </div>
                    </div>
                  </div>
                  <div className="quantity d-flex flex-sm-row flex-column w-100 justify-content-md-between gap-2 ">
                    <div className="d-flex gap-2 align-items-center  w-100 flex-wrap">
                      <div>Quantity:</div>
                      <div className="w-sm-50 ">
                        <input
                          type="number"
                          name="quantity"
                          id="quantity"
                          value={item.Quantity}
                          className="w-100"
                          min={1}
                          onChange={(e) => {
                            UpdateQuantity(item.ProductDet, e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="w-100 d-flex align-items-center">
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          Remove(item.ProductDet._id);
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <>
              <div className="make-heading text-center text-uppercase heading">
                Cart <i className="fa-solid fa-cart-shopping px-2"></i>&nbsp; is
                Empty
              </div>
            </>
          )}
        </div>

        {cart?.length > 0 && (
          <div
            className="d-flex justify-content-center align-items-center w-100 "
            style={{ flex: 1, position: "sticky", top: 100 }}
          >
            <div className="prod-details w-sm-100 ">
              <div className="card w-100">
                <div className="card-header text-primary text-uppercase">
                  Price Details
                </div>
                <div className="card-body w-100">
                  {cart &&
                    cart.map((item) => {
                      return (
                        <div
                          className="card-body w-100"
                          key={item.ProductDet._id}
                        >
                          <div className="d-flex justify-content-between align-items-center w-100 ">
                            <div className="w-100">
                              {item.ProductDet.ProductName}({item.Quantity})
                            </div>
                            <div className="w-100 text-end">
                              Rs.{item.ProductDet.ProductPrice}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  <div className="card-footer">
                    <div className="d-flex justify-content-between align-items-center gap-2 flex-wrap">
                      <div className="text-primary text-uppercase">
                        Total Price
                      </div>

                      <div>Rs.{TotalPrice}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-center justify-content-lg-around  mx-auto flex-wrap my-3 gap-2">
                {/* <button
                className="btn btn-warning text-uppercase"
                onClick={() => Ordernow()}
              >
                Order Now
              </button> */}
                <button
                  className="btn btn-warning text-uppercase"
                  onClick={makePayment}
                >
                  Check Out
                </button>
                {/* <Link
                  to={"/Payment"}
                  className="btn btn-warning text-uppercase"
                >
                  Check Out
                </Link> */}
                <button
                  className="btn btn-danger text-uppercase"
                  onClick={() => {
                    emptycart();
                  }}
                >
                  Empty Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Mycart;
