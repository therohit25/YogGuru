import { useEffect, useState } from "react";
import axios from "axios";
import OrderCard from "../../components/OrderCard";
import { SyncLoader } from "react-spinners";

function Orders() {
  const [ordersdet, setOrdersdet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://yogguru-backend.onrender.com/user/myorders")
      .then((res) => {
        if (res) {
          setLoading(true);
          setOrdersdet(res.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      <p className="heading pt-5 text-center text-uppercase">
        <span
          style={{
            paddingBottom: "1%",
            borderBottom: "2px solid rgb(157, 154, 154)",
          }}
        >
          Order History<i className="fa-solid fa-bag-shopping px-2"></i>
        </span>
      </p>
      <div className="d-flex flex-column-reverse pb-5">
        {loading ? (
          <div className="w-100 text-center" style={{ height: "20vh" }}>
            <SyncLoader color="#36d7b7" />
          </div>
        ) : ordersdet?.length > 0 ? (
          ordersdet.map((order) => {
            return (
              <OrderCard
                key={order._id}
                OrderId={order._id}
                TotalPrice={order.TotalPrice}
                OrderAt={order.OrderAt}
                Products={order.Products}
                Status={order.Status}
                navigate={true}
              />
            );
          })
        ) : (
          <div
            className="d-grid align-items-center text-uppercase"
            style={{ height: "60vh" }}
          >
            <p className="heading w-100 text-center">No Orders Yet</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;
