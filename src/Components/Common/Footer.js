import React from "react";
import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <div className="page-footer text-white bg-dark">
      <footer className="page-footer font-small special-color-dark pt-4">
        <div className="footer-copyright text-center py-3">
          © 2023 Copyright:
          <NavLink to={"https://github.com/ubunfakn"} className={"text-white"}>
            {" "}
            UBUNFAKN
          </NavLink>
        </div>
      </footer>
    </div>
  );
}
