import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  //Declaration
  const Navigate = useNavigate("");

  //Fetching user from local storage
  const auth = localStorage.getItem("user");

  const logout = () => {
    localStorage.removeItem("user");
    Navigate("/");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <NavLink
          className="navbar-brand font-weight-bold text-white"
          style={{ fontSize: "24px" }}
          to={auth ? "/user" : "/"}
        >
          E-COM-Dashboard
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {auth ? (
            <>
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <NavLink
                    className="nav-link text-white mr-2"
                    style={{ fontSize: "18px" }}
                    to={"/user"}
                  >
                    Products
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link text-white mr-2"
                    style={{ fontSize: "18px" }}
                    to={"/user/add"}
                  >
                    Add Product
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link text-white mr-2"
                    style={{ fontSize: "18px" }}
                    to={"/user/profile"}
                  >
                    Profile
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link text-white mr-2"
                    onClick={logout}
                    style={{ fontSize: "18px" }}
                    to={"/"}
                  >
                    logout
                  </NavLink>
                </li>
              </ul>
            </>
          ) : (
            <>
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <NavLink
                    className="nav-link text-white mr-2"
                    style={{ fontSize: "18px" }}
                    to={"/signup"}
                  >
                    SignUp
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link text-white mr-2"
                    style={{ fontSize: "18px" }}
                    to={"/"}
                  >
                    login
                  </NavLink>
                </li>
              </ul>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}
