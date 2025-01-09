import { useState } from "react";
import axios from "axios";

const AddProducts = () => {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    image: "",
  });

  const SignUpSub = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("name", productData.name);
    formdata.append("description", productData.description);
    formdata.append("price", productData.price);
    formdata.append("quantity", productData.quantity);
    formdata.append("image", productData.image);
    try {
      await axios.post(
        "https://yogguru-backend.onrender.com/admin/addproducts",
        formdata
      );
      alert("Product added Successfully!...");
      setProductData({
        name: "",
        description: "",
        price: "",
        quantity: "",
        image: "",
      });
    } catch (error) {
      console.error("Error While Adding Product " + error?.message);
    }
  };

  const handleChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>
      <div className="d-flex  mx-auto align-items-center  ">
        <div className="container-fluid d-flex  justify-content-center align-items-center">
          <div className="d-flex flex-column gap-5 align-items-center p-5 rounded-3  BlueGradientBackColour">
            <span className="text-uppercase heading">Add Product</span>
            <div
              className="container  d-flex justify-content-around align-items-center 
      gap-2 w-100"
            >
              <form
                className="gap-4 d-flex flex-column justify-content-center align-items-center "
                onSubmit={SignUpSub}
              >
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Product Name"
                  className="w-100  inputField text-black"
                  onChange={handleChange}
                  value={productData.name}
                  required
                />
                <textarea
                  placeholder="Description"
                  onChange={handleChange}
                  value={productData.description}
                  name="description"
                  className="w-100  inputField text-black"
                ></textarea>

                <input
                  type="number"
                  name="price"
                  id="price"
                  placeholder="Enter Product Price"
                  className="w-100  inputField text-black"
                  onChange={handleChange}
                  value={productData.price}
                  required
                />
                <input
                  type="number"
                  name="quantity"
                  id="quantity"
                  placeholder="Enter Product Quantity"
                  className="w-100  inputField text-black"
                  onChange={handleChange}
                  value={productData.quantity}
                  required
                />

                <input
                  type="file"
                  name="image"
                  id="image"
                  placeholder="Upload Image"
                  className="w-100  inputField text-black"
                  // value={productData.image}
                  onChange={(e) => {
                    setProductData({
                      ...productData,
                      image: e.target.files[0],
                    });
                  }}
                  required
                />

                <button className="btn btn-primary  form-control">
                  Add Product
                  <i className="fa-solid fa-right-to-bracket px-2"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProducts;
