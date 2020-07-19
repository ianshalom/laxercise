import React from "react";
import Aux from "../../hoc/Aux";
import Navigation from "../Navigation/Navigation";
import Jumbotron from "../UI/Jumbotron/Jumbotron";

const Layout = () => {
  return (
    <Aux>
      <Navigation />
      <Jumbotron />
      <div>Listings</div>
    </Aux>
  );
};

export default Layout;
