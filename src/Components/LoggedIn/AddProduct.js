import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {

    //Declarations
    const [name, setName] = useState("");
    const [price, setPrice] = useState();
    const [category, setCategory] = useState("");
    const [brand, setBrand] = useState("");
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const Navigate = useNavigate("");
    
    //Getting data from form input and sending it to server
    const getDataFromProductForm = async (e) => {

        e.preventDefault();

        //Checking for empty inputs
        if (!name || !price || !category || !brand) {
          setError(true);
          return false;
        }

        //Fetching user from local storage
        let user = JSON.parse(localStorage.getItem("user"));


        //Preparing object for sending it to server
        const data = {
          name: name,
          price: price,
          category: category,
          brand: brand,
          userId: user._id,
        };
        
        //Sending product details to server
        let result = await fetch("http://localhost:8080/add_product", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }).catch((error)=>{
          setError(true);
          setErrorMessage("Something went wrong! Please try again")
          console.log(error);
        })

        if(result!==undefined){
          result = await result.json();
          console.log(result);
          Navigate("/user");
        }
  };
  return (
    <>
      <div
        className="col-md-6 offset-md-3 text-white"
        style={{ marginTop: "4vw" }}
      >
        <div className="card mb-5" style={{ backgroundColor: "darkblue" }}>
          {error? <div className="alert alert-danger" role="alert"><h3>{errorMessage}</h3></div>:null}
          <div className="card-title mt-5">
            <h2>Add Product</h2>
          </div>
          <div className="card-body mt-2">
            <form onSubmit={getDataFromProductForm}>
              <div className="form-group row">
                <label
                  htmlFor="productName"
                  className="col-sm-2 col-form-label d-flex"
                >
                  Name
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    required
                    name="productName"
                    className="form-control"
                    value={name}
                    id="productName"
                    placeholder="Enter Product Name"
                  />
                  {error && !name ? (
                    <span
                      className="text-warning d-flex"
                      style={{ fontSize: "17px" }}
                    >
                      Enter valid Name
                    </span>
                  ) : (
                    <br />
                  )}
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="price"
                  className="col-sm-2 col-form-label d-flex"
                >
                  Price
                </label>
                <div className="col-sm-10">
                  <input
                    type="number"
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    name="price"
                    className="form-control"
                    id="price"
                    value={price}
                    placeholder="Enter Product Price"
                  />
                  {error && !price ? (
                    <span
                      className="text-warning d-flex"
                      style={{ fontSize: "17px" }}
                    >
                      Enter valid Price
                    </span>
                  ) : (
                    <br />
                  )}
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="category"
                  className="col-sm-2 col-form-label d-flex"
                >
                  Category
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    className="form-control"
                    id="category"
                    name="category"
                    value={category}
                    placeholder="Enter Product Category"
                  />
                  {error && !category ? (
                    <span
                      className="text-warning d-flex"
                      style={{ fontSize: "17px" }}
                    >
                      Enter valid Category
                    </span>
                  ) : (
                    <br />
                  )}
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="brand"
                  className="col-sm-2 col-form-label d-flex"
                >
                  Brand
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    onChange={(e) => setBrand(e.target.value)}
                    required
                    name="brand"
                    value={brand}
                    className="form-control"
                    id="brand"
                    placeholder="Enter Product Brand"
                  />
                  {error && !brand ? (
                    <span
                      className="text-warning"
                      style={{ display: "flex", fontSize: "17px" }}
                    >
                      Enter valid Brand
                    </span>
                  ) : (
                    <br />
                  )}
                </div>
              </div>
              <div className="form-group row">
                <div className="col-sm-10 offset-md-1 mt-3">
                  <button
                    type="submit"
                    className="btn btn-outline-success text-white"
                  >
                    Submit Details
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
