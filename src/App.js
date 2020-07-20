import React from "react";
import Layout from "./components/Layout/Layout";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Auth from "./components/Auth/Auth";
import Create from "./container/Create/Create";
import Listing from "./container/Listing/Listing";
import ListingPage from "./components/Listings/Listing";
import Home from "./components/Home/Home";
const App = () => {
  return (
    <Router>
      <div>
        <Layout />
        <Switch>
          <Route path="/listings" exact component={Listing} />
          <Route path="/listings/:listingId" component={ListingPage} />
          <Route path="/create" component={Create} />
          <Route path="/signin" component={Auth} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
