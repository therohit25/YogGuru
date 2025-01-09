import { useState } from "react";
import { useEffect } from "react";
import Table from "../../components/Table";
import axios from "axios";
import { NavLink } from "react-router-dom";

const Products = () => {
  const [productdata, setProductData] = useState(null);
  const FetchProducts = async () => {
    try {
      const result = await axios.get(
        "https://yogguru-backend.onrender.com/products"
      );
      setProductData(result.data);
    } catch (error) {
      console.error(`Error in fetching products for Admin : ${error?.message}`);
    }
  };

  const UpdateQuantity = async (Quantity, ProductId) => {
    try {
      const result = await axios.post(
        "https://yogguru-backend.onrender.com/admin/updatequantity",
        {
          Quantity: Quantity,
          ProductId: ProductId,
        }
      );

      setProductData(
        productdata.map((product) => {
          return product._id === ProductId ? result.data : product;
        })
      );
    } catch (error) {
      console.error(`Error in updating Quantity : ${error?.message}`);
    }
  };
  const DeleteProduct = async (ProductId) => {
    try {
      await axios.delete(
        "https://yogguru-backend.onrender.com/admin/deleteProduct",
        {
          data: { ProductId: ProductId },
        }
      );

      FetchProducts();
    } catch (error) {
      console.error(`Error in Deleting Products : ${error?.message}`);
    }
  };
  useEffect(() => {
    FetchProducts();
  }, []);
  return (
    <div className="d-flex flex-column gap-5">
      <Table
        userData={productdata}
        imgUrl={"images"}
        Header="Uploaded Products"
        Remove={DeleteProduct}
        Quantity={true}
        UpdateQuantity={UpdateQuantity}
      />
      <div className="d-flex justify-content-center align-items-center">
        <NavLink to={"/admin/addproducts"}>
          <button className="btn btn-primary  ">
            <i className="fa-solid fa-circle-plus "></i>Add Products{" "}
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default Products;
