import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Productlist from "../../components/Productlist";
import { addToCart } from "../../features/Cart/Cart";

const Product2 = () => {
  const userdetails = useSelector((state) => state.userSlice.value);
  const { products } = useSelector((state) => state.productSlice);

  const dispatch = useDispatch();
  const { ProductId } = useParams();
  const [indproddet, setIndproddet] = useState(null);
  const [proddet, setProddet] = useState(null);
  const navigate = useNavigate();

  const addtocart = async (set = 0) => {
    if (userdetails !== null) {
      dispatch(addToCart(indproddet));
      if (set === 1) {
        navigate("/MyCart");
      }
    } else {
      await alert("Login First");
      navigate("/Login");
    }
  };

  useEffect(() => {
    const FetchOtherProductd = () => {
      const filteredProducts = products.filter(
        (element) => element._id !== ProductId
      );
      const foundProduct = products.find(
        (element) => element._id === ProductId
      );

      if (foundProduct) {
        setIndproddet(foundProduct);
      }

      setProddet(filteredProducts);
    };

    FetchOtherProductd();
  }, [ProductId]);

  return (
    <div>
      <div
        className="container-fluid-lg py-5"
        style={{ backgroundColor: "#faeeea" }}
      >
        <div className="container d-flex flex-column justify-content-center align-items-center gap-3">
          <div className="product d-flex gap-5  justify-content-center flex-column flex-sm-row p-5 p-sm-0">
            <div className="d-flex flex-column justify-content-center  align-items-center h-100 gap-2  product-img-box">
              <div className="prod-img h-100 w-100  text-center">
                <div className="imgheight ">
                  <img
                    src={`https://yogguru-backend.onrender.com/images/${indproddet?.ProductImg}`}
                    alt="product"
                    className="rounded-1 h-100 w-100"
                    srcSet=""
                  />
                </div>
                <p className="make-semiheading text-end  p-2">3K+ Bought</p>
              </div>

              <div className="d-flex gap-2 px-3">
                <button
                  className="btn btn-warning text-uppercase"
                  onClick={() => {
                    addtocart();
                  }}
                >
                  Add To cart
                </button>
                <button
                  className="btn btn-danger text-uppercase"
                  onClick={() => {
                    addtocart(1);
                  }}
                >
                  Buy
                </button>
              </div>
            </div>
            <div className="prod-det d-flex flex-column">
              <p className="text-decoration-underline text-primary text-uppercase make-semiheading text-sm-start text-center">
                {indproddet?.ProductName}
              </p>
              <p className="px-2 font-monospace para-font">
                {indproddet?.ProductDes}
              </p>
              <div className="d-flex gap-2 align-items-center">
                <p className="make-semiheading">Price:</p>
                <p className="font-monospace">{indproddet?.ProductPrice}</p>
              </div>

              <div className="d-flex gap-2">
                <p className="make-semiheading">Material:</p>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Iusto aut possimus quod dicta dolorum cum vel dolor ad labore
                  magni?
                </p>
              </div>
            </div>
          </div>
          <div className="my-3">
            <p
              className="make-heading text-uppercase pb-2"
              style={{ borderBottom: "2px solid gray" }}
            >
              Other Products
            </p>
          </div>

          <div className="row d-flex justify-content-center align-items-center">
            {proddet?.map((item, ind) => {
              return (
                <div className="col-md-3 my-2 col-sm-5 col-7" key={ind}>
                  <Productlist
                    navto={`/Product2/${item._id}`}
                    Img={item.ProductImg}
                    PId={item.ProductId}
                    Id={item._id}
                    Name={item.ProductName}
                    Description={item.ProductDes}
                    Price={item.ProductPrice}
                    setter={setProddet}
                    CardColourClass={"productCardColour"}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product2;
