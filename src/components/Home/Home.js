import React from "react";
import Jumbotron from "../UI/Jumbotron/Jumbotron";
import Listing from "../../container/Listing/Listing";
import Aux from "../../hoc/Aux";

import Navigation from "../Navigation/Navigation";

const Home = () => {
  return (
    <Aux>
      <Navigation />
      <Jumbotron />
      <Listing />
    </Aux>
  );
};

export default Home;
