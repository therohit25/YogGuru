import axios from "axios";
import { useEffect, useState } from "react";

import Table from "../../Components/Table";

const AllOrders = () => {
  const [orderdata, setOrderdata] = useState(null);
  const [filtereddata, setFilteredData] = useState(null);
  const [datedata, setDatedata] = useState(null);
  const [date, setDate] = useState(null);
  const [status, setStatus] = useState(null);

  const others = ["Pending", "Dispatched", "Delivered"];
  const FetAllOrders = async () => {
    try {
      const result = await axios.get("http://localhost:3004/admin/AllOrders");

      let newobj = result.data.map((order) => {
        // eslint-disable-next-line no-unused-vars
        const { ["Products"]: excludedProperty, ...rest } = order;
        return rest;
      });

      let orders = newobj.map((order) => {
        return {
          ...order,
          ["UserId"]: order.UserId.Name,
        };
      });
      orders = orders.map((order) => {
        // eslint-disable-next-line no-prototype-builtins
        if (order && order?.hasOwnProperty("UserId")) {
          order.Name = order.UserId;
          delete order["UserId"];
        }
        return {
          ...order,
          Name: order.Name,
        };
      });

      setOrderdata(orders);
      setDatedata([
        ...new Set(orders.map((item) => item?.OrderAt.slice(0, 10))),
      ]);

      setFilteredData(orders);
    } catch (error) {
      console.error(`Error in Fetching Orders for Admin : ${error?.message}`);
    }
  };
  const FilterData = () => {
    let filterResult = [];
    if (orderdata) {
      filterResult = [...orderdata];
    }
    if (status) {
      filterResult = filterResult?.filter((item) => item?.Status === status);
    }
    if (date) {
      filterResult = filterResult?.filter(
        (item) => item?.OrderAt.slice(0, 10) === date
      );
    }
    setFilteredData(filterResult);
  };
  const UpdateStatus = async (Status, OrderId) => {
    try {
      await axios.put("http://localhost:3004/admin/updateStatus", {
        OrderId: OrderId,
        Status: Status,
      });
      FetAllOrders();
    } catch (error) {
      console.error(`Error in Update Status : ${error?.message}`);
    }
  };
  const DeleteOrder = async (OrderId) => {
    try {
      await axios.delete("http://localhost:3004/admin/removeOrder", {
        data: { OrderId: OrderId },
      });

      FetAllOrders();
    } catch (error) {
      console.error(`Error in Deleting Order : ${error?.message}`);
    }
  };

  useEffect(() => {
    FetAllOrders();
  }, []);
  useEffect(() => {
    FilterData();
  }, [date, status]);

  return (
    <>
      <div>
        <div className="w-75 p-5">
          <div className="d-flex w-100 gap-2">
            <select
              name="Date"
              id="Date"
              className="form-control form-select "
              onChange={(e) => setDate(e.target.value)}
            >
              <option value="" selected>
                --Select Date--
              </option>
              {datedata?.map((item, ind) => {
                return (
                  <option value={item} key={ind}>
                    {item}
                  </option>
                );
              })}
            </select>
            <select
              name="status"
              id="status"
              className="form-control form-select "
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="" selected>
                --Select Status--
              </option>
              <option value="Pending">Pending</option>
              <option value="Dispatched">Dispatched</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        </div>
        <Table
          userData={filtereddata}
          Header={"Orders"}
          Remove={DeleteOrder}
          others={others}
          UpdateStatus={UpdateStatus}
          ViewBtn={true}
        />
      </div>
    </>
  );
};

export default AllOrders;
