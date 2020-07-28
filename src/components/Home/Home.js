import React from "react";
import Jumbotron from "../UI/Jumbotron/Jumbotron";
import Listing from "../../container/Listing/Listing";
import Aux from "../../hoc/Aux";
import Layout from "../Layout/Layout";

const Home = () => {
  return (
    <Aux>
      <Layout />
      <Jumbotron />
      <Listing />
    </Aux>
  );
};

export default Home;
