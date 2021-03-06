import React from "react";

import Listing from "../../container/Listing/Listing";
import Aux from "../../hoc/Aux";
import LandingPage from "./LandingPage";
import "./Home.css";
const Home = () => {
  return (
    <Aux>
      <LandingPage />
      <Listing style={{ marginTop: "120px" }} />
    </Aux>
  );
};

export default Home;
