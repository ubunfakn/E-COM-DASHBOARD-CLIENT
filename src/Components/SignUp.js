import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  //Declarations
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate("");

  //Getting user data from form input and sending it to server
  const getDataFromForm = async (e) => {
    e.preventDefault();

    //Preparing object for sending it to server
    const data = {
      name: name,
      email: email,
      password: password,
      mobile: mobile,
    };

    //Sending sign up details to server
    let result = await fetch("http://localhost:8080/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).catch((error) => {
      setErrorMessage("Something went wrong!! Please try again");
      setError(true);
      console.log(error);
    });

    if (result !== undefined) {
      result = await result.json();

      //If the sign up is successfull then user will be automatically logged in
      //and user credentials will be saved to local storage
      console.log(result);
      localStorage.setItem("user", JSON.stringify(result.data));
      localStorage.setItem("key", JSON.stringify(result.token));
      //after getting result user will be redirected to default user page
      navigate("/user");
    }
  };

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/user");
    }
  });

  return (
    <>
      <div
        className="col-md-6 offset-md-3 text-white"
        style={{ marginTop: "6vw" }}
      >
        <div className="card mt-1 mb-5" style={{ backgroundColor: "darkblue" }}>
          {error ? (
            <div className="alert alert-danger" role="alert">
              <h3>{errorMessage}</h3>
            </div>
          ) : null}
          <div className="card-title mt-5">
            <h2>Register</h2>
          </div>
          <div className="card-body mt-2">
            <form onSubmit={getDataFromForm}>
              <div className="form-group row">
                <label
                  htmlFor="name"
                  className="col-sm-2 col-form-label d-flex"
                >
                  Name
                </label>
                <div className="col-sm-10">
                  <input
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    required
                    name="name"
                    className="form-control"
                    id="name"
                    value={name}
                    placeholder="Enter Name"
                  />
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="email"
                  className="col-sm-2 col-form-label d-flex"
                >
                  Email
                </label>
                <div className="col-sm-10">
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    required
                    name="email"
                    className="form-control"
                    id="email"
                    value={email}
                    placeholder="Enter Email"
                  />
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="password"
                  className="col-sm-2 col-form-label d-flex"
                >
                  Password
                </label>
                <div className="col-sm-10">
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    required
                    className="form-control"
                    value={password}
                    id="password"
                    name="password"
                    placeholder="Enter Password"
                  />
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="mobile"
                  className="col-sm-2 col-form-label d-flex"
                >
                  Mobile No.
                </label>
                <div className="col-sm-10">
                  <input
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    type="text"
                    required
                    name="mobile"
                    className="form-control"
                    id="mobile"
                    placeholder="Enter Mobile No."
                  />
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
