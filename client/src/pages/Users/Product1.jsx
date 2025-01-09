import "../../assets/css/product1.css";
import { useEffect, useState } from "react";
import Productlist from "../../components/Productlist";
import { useDispatch, useSelector } from "react-redux";
import { FetchProductDet } from "../../features/Product/Products";
import { SyncLoader } from "react-spinners";

const Product1 = () => {
  const { products } = useSelector((state) => state.productSlice);
  const dispatch = useDispatch();
  const [filteredproducts, setFilteredproducts] = useState(null);
  const [searchParams, setSearchParams] = useState("");

  useEffect(() => {
    if (products === null) {
      dispatch(FetchProductDet());
    }
  }, []);

  useEffect(() => {
    let time = setTimeout(() => {
      if (searchParams !== "") {
        let regex = new RegExp(`${searchParams}`, "gi");

        const temp = products.filter((item) => {
          return item.ProductName.match(regex);
        });
        setFilteredproducts(temp);
      } else {
        setFilteredproducts(products);
      }
    }, [500]);

    return () => {
      clearTimeout(time);
    };
  }, [searchParams, products]);

  return (
    <div style={{ backgroundColor: "#faeeea" }}>
      <div className="container d-flex flex-column align-items-center justify-content-center py-5">
        <div className="w-100 py-2">
          <p className="text-dark-50 text-uppercase text-center make-heading heading">
            <span
              style={{
                paddingBottom: "1%",
                borderBottom: "2px solid rgb(157, 154, 154)",
              }}
            >
              Our Products<i className="fa-brands fa-wpexplorer px-2"></i>
            </span>
          </p>
        </div>
        <div className="d-flex gap-2 align-items-center justify-content-center my-4 w-100">
          <div className="form-floating mb-0 w-50 position-relative">
            <input
              type="search"
              className="form-control w-100 "
              name="formId1"
              id="formId1"
              placeholder="Search Products!.."
              onChange={(e) => setSearchParams(e.target.value)}
            />
            <label htmlFor="formId1">Search Products!..</label>
            <span className="searchico position-absolute">
              <i className="fa-brands fa-searchengin"></i>
            </span>
          </div>
        </div>
        <div>
          <div className="row d-flex justify-content-center align-items-center">
            {searchParams !== "" && (
              <div className="my-3 d-flex align-items-center gap-2">
                <span>Search Results for:</span>
                <button className="btn btn-success align-self-start ">{`"${searchParams}"`}</button>
              </div>
            )}
            {filteredproducts?.length > 0 ? (
              filteredproducts?.map((item) => {
                return (
                  <div className="col-md-4 my-2 col-sm-5 col-7" key={item._id}>
                    <Productlist
                      navto={`/Product2/${item._id}`}
                      Img={item.ProductImg}
                      PId={item.ProductId}
                      Id={item._id}
                      Name={item.ProductName}
                      Description={item.ProductDes}
                      CardColourClass={"productCardColour"}
                      Price={item.ProductPrice}
                    />
                  </div>
                );
              })
            ) : (
              <>
                {filteredproducts?.length === 0 ? (
                  <h1 className="text-center heading">
                    Product Not Found!....
                  </h1>
                ) : (
                  <div className="w-100 my-5">
                    <SyncLoader color="#36d7b7" />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product1;
