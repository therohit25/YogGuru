import OrderCard from "../../components/OrderCard";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { SyncLoader } from "react-spinners";

const Parorder = () => {
  const { OrderId } = useParams();
  const [orderDet, setOrderDet] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const result = await axios.post(
          "https://yogguru-backend.onrender.com/admin/viewOrder",
          {
            OrderId: OrderId,
          }
        );

        setOrderDet(result.data);
        setLoading(false);
      } catch (error) {
        console.error(
          `Error in fetching error Particular Order :${error?.message}`
        );
      }
    })();
  }, [OrderId]);

  return (
    <div
      className="d-flex justify-content-center py-5 w-100 "
      style={{ height: "90vh", overflowY: "scroll" }}
    >
      {loading ? (
        <div className="d-flex justify-content-center ">
          <SyncLoader color="#36d7b7" />
        </div>
      ) : (
        <OrderCard
          key={orderDet?._id}
          OrderId={orderDet?._id}
          TotalPrice={orderDet?.TotalPrice}
          OrderAt={orderDet?.OrderAt}
          Products={orderDet?.Products}
          Status={orderDet?.Status}
          navigate={false}
        />
      )}
    </div>
  );
};

export default Parorder;
