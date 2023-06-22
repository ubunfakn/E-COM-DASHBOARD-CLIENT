import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function Products() {
  //Declarations
  const [products, setProducts] = useState([]);
  let data = window.localStorage.getItem("user");
  data = JSON.parse(data);

  //Rendering
  useEffect(() => {
    getProducts();
    // eslint-disable-next-line
  }, []);

  //Fetch products from database
  const getProducts = async () => {
    let result = await fetch(
      `http://localhost:8080/get_products/${data._id}`
    ).catch((error) => {
      console.log(error);
    });
    if (result !== undefined) {
      let resultJson = await result.json();
      setProducts(resultJson);
    }
  };

  //Sending delete request to server
  const deleteProduct = async (id) => {
    let result = await fetch(`http://localhost:8080/delete/${data._id}/${id}`, {
      method: "DELETE",
    }).catch((error) => {
      console.log(error);
    });

    result = await result.json();
    console.log(result);
    getProducts();
  };

  //Search Handler
  const searchHandle = async (e) => {
    //Getting key from search input
    let key = e.target.value;

    //If key is blank then calling get all product api again
    if (!key) {
      getProducts();
    }

    //Sending key to server
    let result = await fetch(
      `http://localhost:8080/search/${data._id}/${key}`
    ).catch((error) => {
      console.log(error);
    });
    if (result !== undefined) {
      result = await result.json();
      setProducts(result);
    }
  };

  return (
    <div className="container-fluid mt-3 mb-4">
      <input
        onChange={searchHandle}
        type="text"
        className="mt-3 bg-white text-darkfont-weight-bold form-control"
        placeholder="Search"
      />
      <div className="row">
        {products.length > 0 ? (
          products.map((product) => (
            <div className="col-md-3" key={product._id}>
              <div
                className="card bg-primary text-white mt-4"
                style={{ fontSize: "21px" }}
              >
                <div className="card-body">
                  <h5>{product.name}</h5>
                  <br />
                  <h5>Price: ₹{product.price}</h5>
                  <h5>Category: {product.category}</h5>
                  <h5>Brand: {product.brand}</h5>
                  <NavLink
                    to={`/user/update/${product._id}`}
                    type="button"
                    className="mt-5 btn btn-warning font-weight-bold text-white btn-block"
                  >
                    Update Product
                  </NavLink>
                  <button
                    type="button"
                    onClick={() => deleteProduct(product._id)}
                    className="mt-2 btn btn-danger font-weight-bold text-white btn-block"
                  >
                    Delete Product
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="container mt-5">
            <h1 className="text-center">No result found...</h1>
          </div>
        )}
      </div>
    </div>
  );
}
