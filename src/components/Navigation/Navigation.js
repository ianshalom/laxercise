import React from "react";
import "./Navigation.css";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className={"MainNav"}>
      <ul className={"Nav"}>
        <li>
          <Link to="/" className={"NavBrand"}>
            LaxErcise
          </Link>
        </li>

        {/* <li>
          <Link to="/listings" className={"NavElements"}>
            Listings
          </Link>
        </li> */}
        <li>
          <Link to="/create" className={"NavElements"}>
            Create
          </Link>
        </li>
        {/* <li>
          <Link to="/signin" className={"NavElements"}>
            Sign In
          </Link>
        </li> */}
        <li>
          <Link to="/login" className={"NavElements"}>
            Login
          </Link>
        </li>
        <li>
          <Link to="/register" className={"NavElements"}>
            Register
          </Link>
        </li>
        <li>
          <Link to="/myactivities" className={"NavElements"}>
            My Activities
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
