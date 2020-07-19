import React, { Component } from "react";
import Layout from "./components/Layout/Layout";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import Auth from "./components/Auth/Auth";
import Create from "./components/Create/Create";
import Listing from "./container/Listing/Listing";

const App = () => {
  return (
    <Router>
      <div>
        <Layout />
        <Switch>
          <Route path="/listings" component={Listing} />
          <Route path="/create" component={Create} />
          <Route path="/signin" component={Auth} />
          <Route path="/" />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
