import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  //Declarations
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(false);
  const Navigate = useNavigate("");
  const [errorMessage, setErrorMessage] = useState("");

  //Handling login credentials
  const handleLogin = async (e) => {
    e.preventDefault();

    //Preparing object for sending it to server
    let data = { email: email, password: password };

    //Sending data for verification
    let result = await window
      .fetch("http://localhost:8080/login", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      })
      .catch((error) => {
        setErrorMessage("Something went wrong!! Please try again");
        setErr(true);
        console.log(error);
      });

    console.log(result);
    if (result !== undefined) {
      try {
        result = await result.json();
        console.log(result);
        //If no error occurred
        window.localStorage.setItem("user", JSON.stringify(result.user));
        window.localStorage.setItem("key", JSON.stringify(result.token));

        //Saving data to local storage
        //Redirecting to default user page
        Navigate("/user");
      } catch (error) {
        //If error occurred then updating setErr to true
        setErrorMessage("Invalid Credentials");
        setErr(true);

        console.log(error);
      }
    }
  };

  //This will prevent acessing login url from URL path when the user is already logged in
  useEffect(() => {
    //Fetching user from localstorage
    const auth = window.localStorage.getItem("user");
    //If auth is not null then preventing access of login page through custom URL
    if (auth) Navigate("/user");
  });

  return (
    <div className="container">
      <div className="col-md-6 offset-md-3">
        <div
          className="card text-white mb-5"
          style={{ marginTop: "9vw", backgroundColor: "darkblue" }}
        >
          {err ? (
            <div className="alert alert-danger" role="alert">
              <h5>{errorMessage}</h5>
            </div>
          ) : null}
          <div className="card-title mt-3">
            <h1>Login</h1>
          </div>
          <div className="card-body">
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label htmlFor="email" className="d-flex">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                  id="email"
                  placeholder="Enter email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email" className="d-flex">
                  Password
                </label>
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                />
              </div>
              <button type="submit" className="btn btn-success btn-lg">
                login
              </button>
            </form>

            <div className="container mt-4">
              <h6>
                Not Registered? <Link to={"/signup"}> SignUp</Link>
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
