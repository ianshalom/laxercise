import React from "react";
import Jumbotron from "../UI/Jumbotron/Jumbotron";
import Listing from "../../container/Listing/Listing";
import Aux from "../../hoc/Aux";

const Home = () => {
  return (
    <Aux>
      <Jumbotron />
      <Listing />
    </Aux>
  );
};

export default Home;
