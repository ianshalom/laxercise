import React from "react";
import Aux from "../../hoc/Aux";
import Navigation from "../Navigation/Navigation";

const Layout = () => {
  return (
    <Aux>
      <h1>LaxErcise</h1>
      <Navigation />
      <div>Jumbotron</div>
      <div>Listings</div>
    </Aux>
  );
};

export default Layout;
