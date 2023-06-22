import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateProduct() {
  //Declarartions
  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [error, setError] = useState(true);
  const Navigate = useNavigate("");
  const params = useParams();

  //Fetching data from API
  const getData = async () => {
    //fetch from database by given id
    let result = await fetch(`http://localhost:8080/get_product/${params.id}`, {
      headers: { Authorization: JSON.parse(localStorage.getItem("key")) },
    }).catch((error) => {
      console.log(error);
    });
    result = await result.json();

    //Setting values fetched from database to their respective variables
    setName(result.name);
    setPrice(result.price);
    setBrand(result.brand);
    setCategory(result.category);
  };

  //rendering
  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  //get data from form and dispatching it to the server
  const getDataFromProductForm = async (e) => {
    e.preventDefault();

    //Checking for empty input
    if (!name || !price || !category || !brand) {
      setError(true);
      return false;
    }

    //Setting object keys with their respective updated values
    setName(name);
    setPrice(price);
    setBrand(brand);
    setCategory(category);

    //Decalaring and setting an object to send
    const updatedData = {
      name: name,
      price: price,
      category: category,
      brand: brand,
    };

    //Sending data to server
    let result = await fetch(`http://localhost:8080/update/${params.id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: JSON.parse(localStorage.getItem("key")),
      },
      body: JSON.stringify(updatedData),
    });

    result = await result.json();
    console.log(result);
    Navigate("/user/");
  };
  return (
    <>
      <div
        className="col-md-6 offset-md-3 text-white"
        style={{ marginTop: "6vw" }}
      >
        <div className="card mb-5" style={{ backgroundColor: "darkblue" }}>
          <div className="card-title mt-5">
            <h2>Update Product</h2>
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
