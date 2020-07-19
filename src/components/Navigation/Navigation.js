import React from "react";
import "./Navigation.css";

const Navigation = () => {
  const navElements = ["Home", "Listings", "Create", "Sign In", "Sign Up"];

  const navBar = navElements.map((el) => {
    return <li className={"NavElements"}>{el}</li>;
  });

  return (
    <nav className={"MainNav"}>
      <ul className={"Nav"}>
        <li className={"NavBrand"}>LaxErcise</li>
        {navBar}
      </ul>
    </nav>
  );
};

export default Navigation;
