import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

import { useSelector } from "react-redux";

const Payment = () => {
  const { cart } = useSelector((state) => state.cartSlice);

  const makePayment = async () => {
    await loadStripe(import.meta.env.VITE_STRIPE_PAYMENT_URL);
    try {
      await axios.post("http://localhost:3004/user/OnlineOrder", {
        cart,
      });
    } catch (err) {
      console.error(`Error while making payment : ${err?.message}`);
    }
  };
  return (
    <>
      <button className="btn-outline-primary" onClick={makePayment}>
        Checkout
      </button>
    </>
  );
};

export default Payment;
