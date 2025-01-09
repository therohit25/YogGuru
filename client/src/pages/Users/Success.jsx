import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FinalPrice, emptyCart, getCart } from "../../features/Cart/Cart";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const { TotalPrice, cart } = useSelector((state) => state.cartSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchFinalPrice = () => {
    if (cart?.length > 0) {
      dispatch(FinalPrice());
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getCart());
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    fetchFinalPrice();
  }, [cart]);

  useEffect(() => {
    if (TotalPrice > 0) {
      axios
        .post("https://yogguru-backend.onrender.com/user/order", {
          TotalPrice: TotalPrice,
        })
        .then((res) => {
          if (res) {
            dispatch(emptyCart());
            navigate("/Orders");
          }
        })
        .catch((err) => console.error("Error is " + err));
    }
  }, [TotalPrice]);
  return (
    <div style={{ height: "70vh" }}>
      <h1>Payment Successfull</h1>
    </div>
  );
};
export default Success;
